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
Your task is to recommend a single, specific vape flavor from the catalog provided, including its hit count if available.

**User Preferences:**
"{{{tasteProfile}}}"

**Available Product Catalog:**
{{{catalog}}}

**Instructions:**
1.  Analyze the user's preferences for taste (e.g., fruity, fresh), type (e.g., number of hits), and any other keywords.
2.  Carefully examine the provided catalog to find the best match.
3.  Your response MUST be one of the flavors available in the catalog.
4.  Provide a recommendation and a brief, friendly reasoning for your choice. If the user specifies a number of hits (e.g., "25,000 hits"), prioritize flavors from that category.
5.  In your recommendation, also specify the brand and hit count to be helpful, for example "Black Cherry (GEEK BAR - 15,000 Hits)".

**Example Output:**
{
  "flavorRecommendation": "Blue Rancher (GEEK BAR - 25,000 Hits)",
  "reasoning": "Claro, para algo frutal y de 25,000 hits, te recomiendo el Blue Rancher de GEEK BAR. Es un sabor dulce y ácido a la vez que seguro te va a gustar y cumple con los hits que buscas."
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
    // Convert catalog data to a simple string format for the prompt
    const catalogString = catalogData
      .map(
        brand =>
          `Brand: ${brand.name}\n` +
          brand.hits
            .map(
              hit =>
                `  - ${hit.type}:\n` +
                hit.flavors.map(flavor => `    - ${flavor}`).join('\n')
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
