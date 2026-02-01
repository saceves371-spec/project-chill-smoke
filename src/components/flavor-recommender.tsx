'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { recommendFlavor, type FlavorRecommendationOutput } from '@/ai/flows/flavor-recommendation-tool';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  tasteProfile: z.string().min(10, {
    message: 'Describe tus gustos con un poco más de detalle.',
  }),
});

export function FlavorRecommender() {
  const [recommendation, setRecommendation] = useState<FlavorRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tasteProfile: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await recommendFlavor(data);
      setRecommendation(result);
    } catch (error) {
      console.error('Error getting flavor recommendation:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo obtener una recomendación. Inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="recommender" className="w-full py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <Card className="border-primary/50 bg-card/80 shadow-lg shadow-primary/10 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl text-primary">Recomendador de Sabores IA</CardTitle>
            </div>
            <CardDescription>
              ¿No sabes qué elegir? Describe lo que te apetece (dulce, frutal, un postre, para acompañar el café...) y nuestra IA te dará una recomendación.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField
                  control={form.control}
                  name="tasteProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Tus preferencias</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ej: Busco algo frutal y refrescante, que no sea muy dulce. Quizás con un toque de menta..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  {isLoading ? 'Pensando...' : 'Obtener recomendación'}
                </Button>
              </CardFooter>
            </form>
          </Form>

          {isLoading && (
            <div className="flex animate-pulse flex-col gap-4 p-6 pt-0">
               <div className="h-6 w-1/3 rounded-md bg-muted"></div>
               <div className="space-y-2">
                 <div className="h-4 w-full rounded-md bg-muted"></div>
                 <div className="h-4 w-5/6 rounded-md bg-muted"></div>
               </div>
            </div>
          )}

          {recommendation && (
            <div className="border-t border-border p-6">
              <h3 className="text-xl font-bold text-primary">{recommendation.flavorRecommendation}</h3>
              <p className="mt-2 text-muted-foreground">{recommendation.reasoning}</p>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
