// This is a server-side file
'use server';

/**
 * @fileOverview A tool that suggests vape flavors based on user preferences.
 *
 * - recommendFlavor - A function that recommends vape flavors.
 * - FlavorRecommendationInput - The input type for the recommendFlavor function.
 * - FlavorRecommendationOutput - The return type for the recommendFlavor function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { catalogData } from '@/lib/data';

const FlavorRecommendationInputSchema = z.object({
  tasteProfile: z
    .string()
    .describe(
      'Desired taste profiles, mood, or food pairings to base flavor recommendation on.'
    ),
});
export type FlavorRecommendationInput = z.infer<
  typeof FlavorRecommendationInputSchema
>;

const FlavorRecommendationOutputSchema = z.object({
  flavorRecommendation: z
    .string()
    .describe('The vape flavor recommended based on user taste profile.'),
  reasoning: z
    .string()
    .describe(
      'The reasoning for recommending the specific vape flavor, including why it matches the user taste profile, mood, or food pairings.'
    ),
});
export type FlavorRecommendationOutput = z.infer<
  typeof FlavorRecommendationOutputSchema
>;

export async function recommendFlavor(
  input: FlavorRecommendationInput
): Promise<FlavorRecommendationOutput> {
  return flavorRecommendationFlow(input);
}

const FlavorRecommendationWithCatalogInputSchema = z.object({
  tasteProfile: z.string(),
  catalog: z.string(),
});

const flavorRecommendationPrompt = ai.definePrompt({
  name: 'flavorRecommendationPrompt',
  input: { schema: FlavorRecommendationWithCatalogInputSchema },
  output: { schema: FlavorRecommendationOutputSchema },
  prompt: `You are an expert vape flavor recommender for a store called "Chill Smoke".
Your task is to recommend a single, specific vape flavor from the catalog provided, including its hit count if available. The user will ask in Spanish.

**User Preferences (in Spanish):**
"{{{tasteProfile}}}"

**Available Product Catalog (Flavor names are in English, with emojis):**
{{{catalog}}}

**Instructions:**
1.  **Analyze the user's request in Spanish.** Pay close attention to keywords describing flavors (e.g., "durazno" for peach, "frutal" for fruit), feelings (e.g., "fresco" for fresh/cool), and technical details like the number of "hits".
2.  **Match the request to the catalog.** Use both the English flavor names and the associated emojis to find the best possible match. For example, a request for "durazno" can be matched with a flavor named "Peach" or one with a 🍑 emoji. A request for "fresco" could match with "mint", "ice", or flavors with ❄️.
3.  **Select one flavor.** Your response MUST be one of the flavors available in the catalog.
4.  **Provide helpful details.** In your recommendation, specify the brand and hit count, for example: "Black Cherry (GEEK BAR - 15,000 Hits)".
5.  **Explain your choice in Spanish.** Give a brief, friendly reasoning for your recommendation.
6.  **CRITICAL**: Your final JSON output must **NOT** contain any emojis. You will read emojis from the input catalog, but you must not write them in the \`flavorRecommendation\` field of the output.

**Example Output:**
{
  "flavorRecommendation": "White Peach Raspberry (GEEK BAR - 25,000 Hits)",
  "reasoning": "¡Claro! Para algo con durazno, te recomiendo el White Peach Raspberry de GEEK BAR. Combina el dulce del durazno blanco con la frambuesa y es de 25,000 hits, aunque no es fresco/mentolado, su perfil frutal es excelente."
}

Flavor Recommendation:`,
});

const flavorRecommendationFlow = ai.defineFlow(
  {
    name: 'flavorRecommendationFlow',
    inputSchema: FlavorRecommendationInputSchema,
    outputSchema: FlavorRecommendationOutputSchema,
  },
  async input => {
    // Helper to remove emojis and extra spaces from the FINAL output.
    const cleanText = (str: string) =>
      str
        .replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
          ''
        )
        .replace(/\s+/g, ' ')
        .trim();

    // Convert catalog data to a simple string format for the prompt, KEEPING emojis for better matching
    const catalogString = catalogData
      .map(
        brand =>
          `Brand: ${brand.name}\n` +
          brand.hits
            .map(
              hit =>
                `  - ${hit.type}:\n` +
                hit.flavors
                  .map(flavor => `    - ${flavor.replace(/\s+/g, ' ').trim()}`)
                  .join('\n')
            )
            .join('\n')
      )
      .join('\n\n');

    const { output } = await flavorRecommendationPrompt({
      tasteProfile: input.tasteProfile,
      catalog: catalogString,
    });

    if (!output) {
      throw new Error('No se pudo obtener una recomendación de la IA.');
    }

    // Clean the flavor recommendation from the output, just in case the AI disobeys.
    // The prompt already instructs the AI not to include emojis in the final output.
    return {
      flavorRecommendation: cleanText(output.flavorRecommendation),
      reasoning: output.reasoning,
    };
  }
);
