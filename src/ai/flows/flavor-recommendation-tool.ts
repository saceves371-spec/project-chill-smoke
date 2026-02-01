// This is a server-side file
'use server';

/**
 * @fileOverview A tool that suggests vape flavors based on user preferences.
 *
 * - recommendFlavor - A function that recommends vape flavors.
 * - FlavorRecommendationInput - The input type for the recommendFlavor function.
 * - FlavorRecommendationOutput - The return type for the recommendFlavor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FlavorRecommendationInputSchema = z.object({
  tasteProfile: z
    .string()
    .describe(
      'Desired taste profiles, mood, or food pairings to base flavor recommendation on.'
    ),
});
export type FlavorRecommendationInput = z.infer<typeof FlavorRecommendationInputSchema>;

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
export type FlavorRecommendationOutput = z.infer<typeof FlavorRecommendationOutputSchema>;

export async function recommendFlavor(input: FlavorRecommendationInput): Promise<FlavorRecommendationOutput> {
  return flavorRecommendationFlow(input);
}

const flavorRecommendationPrompt = ai.definePrompt({
  name: 'flavorRecommendationPrompt',
  input: {schema: FlavorRecommendationInputSchema},
  output: {schema: FlavorRecommendationOutputSchema},
  prompt: `Based on the user's preferences, recommend a vape flavor and explain your reasoning.

User Preferences: {{{tasteProfile}}}

Consider the following when making your recommendation:

- The user's desired taste profiles (e.g., sweet, fruity, minty, dessert-like).
- The user's mood (e.g., relaxed, energized, focused).
- Food pairings (e.g., coffee, chocolate, fruit). 
- Whether the desired tastes align with a valid set of flavor pairings. 

Flavor Recommendation:`,
});

const flavorRecommendationFlow = ai.defineFlow(
  {
    name: 'flavorRecommendationFlow',
    inputSchema: FlavorRecommendationInputSchema,
    outputSchema: FlavorRecommendationOutputSchema,
  },
  async input => {
    const {output} = await flavorRecommendationPrompt(input);
    return output!;
  }
);
