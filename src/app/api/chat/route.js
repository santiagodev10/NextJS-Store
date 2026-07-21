import { streamText, convertToModelMessages, createUIMessageStreamResponse, toUIMessageStream } from 'ai';
import { google } from '@ai-sdk/google';
import { getProducts } from '@/services/shopify/products';
import { storeContext } from '@/config/storeContext';

export async function POST(req) {
   const { messages } = await req.json();

   const products = await getProducts();

   const productList = products
      .map((p) => `- ${p.title} | $${p.price} | Tags: ${p.tags.join(', ')} | Handle: ${p.handle} | ID: ${p.id}`)
      .join('\n');

   const system = `Eres un asistente de compras de ${storeContext.name}. ${storeContext.description}
Responde preguntas sobre productos, recomendaciones, disponibilidad y proceso de compra.
Sé amable, servicial y conciso. Responde en el idioma del usuario.
Si no sabes la respuesta, dilo honestamente.
Cuando menciones un producto, incluye su link con el formato: [Nombre del Producto](/product/handle?id=productId).
Ejemplo: [Wireless Keyboard](/product/wireless-keyboard?id=123456789)

POLÍTICAS DE LA TIENDA:
- Envío: ${storeContext.policies.shipping}
- Devoluciones: ${storeContext.policies.returns}
- Pago: ${storeContext.policies.payment}

PREGUNTAS FRECUENTES:
${storeContext.faq.join('\n')}

CATÁLOGO DE PRODUCTOS DISPONIBLES:
${productList}`;

   const result = streamText({
      model: google('gemini-3-flash-preview'),
      system,
      messages: await convertToModelMessages(messages),
   });

   return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
   });
}
