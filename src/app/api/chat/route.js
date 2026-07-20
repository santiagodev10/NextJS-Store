import { streamText, convertToModelMessages, tool, createUIMessageStreamResponse, toUIMessageStream } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { env } from '@/config/env';

export async function POST(req) {
   const { messages } = await req.json();

   const result = streamText({
      model: google('gemini-3.5-flash'),
      system: `Eres un asistente de compras de una tienda de e-commerce llamada NextJS Store.
               Ayuda a los usuarios con preguntas sobre productos, recomendaciones,
               disponibilidad y proceso de compra. Sé amable, servicial y conciso.
               Responde en el idioma del usuario.`,
      messages: await convertToModelMessages(messages),
      tools: {
         searchProducts: tool({
            description: 'Buscar productos en la tienda por nombre o categoría',
            inputSchema: z.object({
               query: z.string().describe('Término de búsqueda del producto'),
            }),
            execute: async ({ query }) => {
               const response = await fetch(
                  `${env.SHOPIFY_HOSTNAME}/admin/api/2025-04/products.json`,
                  {
                     headers: {
                        'X-Shopify-Access-Token': env.SHOPIFY_TOKEN,
                     },
                  }
               );

               const data = await response.json();
               const products = data.products || [];

               const filtered = products.filter((p) =>
                  p.title.toLowerCase().includes(query.toLowerCase()) ||
                  (p.tags && p.tags.toLowerCase().includes(query.toLowerCase()))
               );

               return filtered.slice(0, 5).map((p) => ({
                  title: p.title,
                  price: p.variants?.[0]?.price || 'N/A',
                  handle: p.handle,
                  tags: p.tags || '',
               }));
            },
         }),
      },
   });

   return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
   });
}
