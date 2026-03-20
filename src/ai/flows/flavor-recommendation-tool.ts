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

const RecommendationItemSchema = z.object({
  flavorRecommendation: z
    .string()
    .describe('The vape flavor or pen recommended based on user preferences.'),
  reasoning: z
    .string()
    .describe(
      'The reasoning for recommending the specific product, including why it matches the user preferences.'
    ),
});

const FlavorRecommendationOutputSchema = z.object({
    recommendations: z.array(RecommendationItemSchema).max(2).describe('A list of up to two product recommendations.')
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
  prompt: `Eres el experto sumiller de "Chill Smoke", con una vibra urbana, moderna y vibrante.
Tu misión es recomendar los productos perfectos de nuestros catálogos basándote en lo que el usuario busca (sabores, estados de ánimo, ocasiones o incluso maridajes con comida).

**Entrada del Usuario:**
"{{{tasteProfile}}}"

Tienes dos catálogos exclusivos:

**1. Vapes Desechables:** Sabores intensos con notas en español en paréntesis para guiarte (ej. 'fresco', 'dulce', 'frutal').
{{{vapeCatalog}}}

**2. Plumas (THC):** Categorizadas por SATIVA (energía), INDICA (relax) o HÍBRIDA (balance).
{{{plumasCatalog}}}

---

**TU TAREA:**

1. **Analiza la Intención:** ¿Busca una "pluma" o un vape de sabor? Si menciona "pluma", "thc" o efectos como "relax/energía", prioriza el catálogo de Plumas.
2. **Razonamiento de Maridaje (Mood & Food):** 
   - Si menciona comida (ej. "después de unos tacos"), busca algo fresco o cítrico para limpiar el paladar. 
   - Si menciona un estado de ánimo (ej. "quiero fiesta"), busca sabores dulces y explosivos o una pluma Sativa.
   - Si menciona "relax", busca sabores de menta/fríos o una pluma Indica.
3. **Selección:** Elige hasta DOS productos que encajen mejor.
4. **Respuesta:** 
   - **flavorRecommendation**: Nombre completo del producto (Sabor + Marca + Hits).
   - **reasoning**: Explica en español, con estilo "Chill Smoke", por qué este producto es el ideal para su situación específica. Conecta su antojo con el perfil del producto.

**REGLAS CRÍTICAS:**
- Usa un tono amigable, urbano y experto.
- Si no hay match ideal, devuelve "No se encontró un producto ideal" y explica por qué con estilo, sugiriendo algo cercano.
- No inventes productos que no estén en el catálogo.`,
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
