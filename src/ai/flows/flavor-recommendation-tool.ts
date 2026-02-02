// This is a server-side file
'use server';

/**
 * @fileOverview A tool that suggests vape flavors or pens based on user preferences.
 *
 * - recommendFlavor - A function that recommends vape flavors or pens.
 * - FlavorRecommendationInput - The input type for the recommendFlavor function.
 * - FlavorRecommendationOutput - The return type for the recommendFlavor function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { catalogData, plumasData } from '@/lib/data';

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
    .describe('The vape flavor or pen recommended based on user preferences.'),
  reasoning: z
    .string()
    .describe(
      'The reasoning for recommending the specific product, including why it matches the user preferences.'
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
  vapeCatalog: z.string(),
  plumasCatalog: z.string(),
});

const flavorRecommendationPrompt = ai.definePrompt({
  name: 'flavorRecommendationPrompt',
  input: { schema: FlavorRecommendationWithCatalogInputSchema },
  output: { schema: FlavorRecommendationOutputSchema },
  prompt: `You are an expert product recommender for a store called "Chill Smoke".
Your task is to recommend a single, specific product from the catalogs provided, based on the user's request in Spanish.

**User Preferences (in Spanish):**
"{{{tasteProfile}}}"

You have two product catalogs:

**1. Vapes Desechables (Disposable Vapes):**
This catalog contains vapes with various flavors. The flavor names are in English, but include Spanish keywords in parentheses to help you find a match (e.g., 'mango', 'fresa', 'fresco').
{{{vapeCatalog}}}

**2. Plumas (Pens):**
This catalog contains THC pens with different brands for each type.
{{{plumasCatalog}}}

---

**YOUR TASK:**

1.  **Analyze the user's request.** First, determine if the user is asking for a "pluma". Look for the word "pluma" (or its variations) in their request.

2.  **Choose the correct catalog to search.**
    *   If the request contains "pluma", you MUST recommend an item ONLY from the "Plumas" catalog.
    *   If the request does NOT contain "pluma", you MUST recommend an item ONLY from the "Vapes Desechables" catalog.

3.  **Find the best match.** Based on the user's description (flavors, feelings, etc.), find the single best matching product in the chosen catalog. For Plumas, you can match based on the description which includes SATIVA, INDICA, or HIBRIDA.

4.  **Format your response as follows:**
    *   **flavorRecommendation**: State the full product name.
        *   *For Vapes*: State the full flavor name, brand, and hit count. Example: "White peach raspberry 🍑🫐 (GEEK BAR - 25,000 Hits)".
        *   *For Plumas*: State the type and suggest one of the available brands. Example: "Pluma USA, marca MUHAMEDS".
    *   **reasoning**: Explain in Spanish why you chose this product, connecting it to the user's preferences.

**IMPORTANT:** If you cannot find a suitable product in the corresponding catalog, you MUST respond with "No se encontró un producto ideal" for the \`flavorRecommendation\` field, and politely explain why in the \`reasoning\` field in Spanish. For example, if a user asks for a pluma with a specific fruit flavor, you should explain that plumas are categorized by SATIVA/INDICA/HIBRIDA and not by fruit flavors.`,
});

const flavorRecommendationFlow = ai.defineFlow(
  {
    name: 'flavorRecommendationFlow',
    inputSchema: FlavorRecommendationInputSchema,
    outputSchema: FlavorRecommendationOutputSchema,
  },
  async input => {
    // Vapes catalog string
    const vapeCatalogString = catalogData
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

    // Plumas catalog string
    const plumasCatalogString = plumasData.items
      .map(
        item =>
          `- Tipo: ${item.name}\n` +
          `  Descripción: ${item.description}\n` +
          `  Marcas: ${item.brands.join(', ')}`
      )
      .join('\n\n');

    const { output } = await flavorRecommendationPrompt({
      tasteProfile: input.tasteProfile,
      vapeCatalog: vapeCatalogString,
      plumasCatalog: plumasCatalogString,
    });

    if (!output) {
      throw new Error('No se pudo obtener una recomendación de la IA.');
    }

    return output;
  }
);
