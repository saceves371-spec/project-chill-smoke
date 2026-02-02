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
Your task is to recommend a single, specific vape flavor from the catalog provided. The user will ask in Spanish. The catalog has English flavor names, but also contains Spanish keywords in parentheses to help you.

**User Preferences (in Spanish):**
"{{{tasteProfile}}}"

**Available Product Catalog:**
{{{catalog}}}

**Instructions:**
1.  **Analyze the user's request.** Look for keywords describing flavors (e.g., "durazno"), feelings (e.g., "fresco"), or technical details (e.g., "15,000 hits").
2.  **Find the best match.** Use the user's keywords to find the best matching flavor in the catalog. The Spanish keywords in parentheses are your primary guide.
3.  **Format your response:**
    *   **flavorRecommendation**: State the full flavor name, brand, and hit count. For example: "White peach raspberry 🍑🫐 (GEEK BAR - 25,000 Hits)". You MUST NOT include the Spanish keywords from the parenthesis in this field.
    *   **reasoning**: Explain in Spanish why you chose this flavor.

**IMPORTANT:** If you cannot find a suitable flavor, you MUST respond in the correct format. For \`flavorRecommendation\`, use the text "No se encontró un sabor ideal". For \`reasoning\`, politely explain in Spanish that no match was found and suggest the user describe their preference differently.`,
});

const flavorRecommendationFlow = ai.defineFlow(
  {
    name: 'flavorRecommendationFlow',
    inputSchema: FlavorRecommendationInputSchema,
    outputSchema: FlavorRecommendationOutputSchema,
  },
  async input => {
    // Convert catalog data to a simple string format for the prompt, KEEPING emojis and keywords.
    const catalogString = catalogData
      .map(
        brand =>
          `Brand: ${brand.name}\n` +
          brand.hits
            .map(
              hit =>
                `  - ${hit.type}:\n` +
                hit.flavors
                  .map(flavor => `    - ${flavor}`)
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

    return output;
  }
);
