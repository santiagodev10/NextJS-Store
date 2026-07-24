import crypto from "crypto";
import { env } from "@/config/env";

export const verifyShopifyWebhook = (rawBody, hmacHeader) => {
   if (!hmacHeader) {
      return { isValid: false, error: "Missing HMAC header." };
   }

   if (!env.SHOPIFY_WEBHOOK_SECRET) {
      return { isValid: false, error: "SHOPIFY_WEBHOOK_SECRET is not configured." };
   }

   const hash = crypto
      .createHmac("sha256", env.SHOPIFY_WEBHOOK_SECRET)
      .update(rawBody, "utf8")
      .digest("base64");

   if (hash.length !== hmacHeader.length) {
      return { isValid: false, error: "HMAC length mismatch." };
   }

   const isValid = crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(hmacHeader)
   );

   if (!isValid) {
      return { isValid: false, error: "HMAC verification failed." };
   }

   return { isValid: true, error: null };
};
