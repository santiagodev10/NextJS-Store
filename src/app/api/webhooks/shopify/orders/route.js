import { NextResponse } from "next/server";
import { verifyShopifyWebhook } from "@/utils/shopify/verifyWebhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
   const rawBody = await req.text();
   const hmacHeader = req.headers.get("x-shopify-hmac-sha256");
   const topic = req.headers.get("x-shopify-topic");
   const shopDomain = req.headers.get("x-shopify-shop-domain");
   const webhookId = req.headers.get("x-shopify-webhook-id");

   const { isValid, error } = verifyShopifyWebhook(rawBody, hmacHeader);

   if (!isValid) {
      console.error(`[Webhook] Verification failed: ${error}`);
      return NextResponse.json({ error }, { status: 401 });
   }

   const order = JSON.parse(rawBody);

   console.log(`[Webhook] Order received`, {
      webhookId,
      topic,
      shopDomain,
      orderId: order.id,
      orderNumber: order.order_number,
      email: order.email,
      totalPrice: order.total_price,
      currency: order.currency,
      financialStatus: order.financial_status,
      fulfillmentStatus: order.fulfillment_status,
      customerEmail: order.customer?.email,
      customerId: order.customer?.id,
      lineItemsCount: order.line_items?.length,
      processedAt: order.processed_at,
   });

   return NextResponse.json({ received: true }, { status: 200 });
}
