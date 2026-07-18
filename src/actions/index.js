"use server";

import { GraphQLClientSingleton } from "@/graphql";
import { createCartMutation } from "@/graphql/mutations/createCartMutation";
import { createUserMutation } from "@/graphql/mutations/createUserMutation";
import { createAccessToken } from "@/utils/auth/createAccessToken";
import { validateAccessToken } from "@/utils/auth/validateAccessToken";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { env } from "@/config/env";

export async function handleCreateUser(formData) {
   const formDataObject = Object.fromEntries(formData);
   const name = String(formDataObject.name || "").trim();
   const lastname = String(formDataObject.lastname || "").trim();
   const email = String(formDataObject.email || "").trim().toLowerCase();
   const phone = String(formDataObject.phone || "").trim();
   const password = String(formDataObject.password || "");
   const retypePassword = String(formDataObject.retypePassword || "");

   if (!name || !lastname || !email || !phone || !password || !retypePassword) {
      return {
         ok: false,
         message: "Todos los campos son obligatorios.",
      };
   }

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (!emailRegex.test(email)) {
      return {
         ok: false,
         message: "Email invalido.",
      };
   }

   if (password.length < 8) {
      return {
         ok: false,
         message: "La contrasena debe tener al menos 8 caracteres.",
      };
   }

   if (password !== retypePassword) {
      return {
         ok: false,
         message: "Las contrasenas no coinciden.",
      };
   }

   try {
      const graphqlClient = GraphQLClientSingleton.getInstance().getClient();

      const variables = {
         input: {
            firstName: name,
            lastName: lastname,
            email,
            password,
            phone: phone.startsWith("+") ? phone : `+58${phone}`,
         },
      };

      const { customerCreate } = await graphqlClient.request(createUserMutation, variables);
      const { customerUserErrors, customer } = customerCreate;

      if (customerUserErrors?.length) {
         return {
            ok: false,
            message: customerUserErrors[0].message,
            errors: customerUserErrors,
         };
      }

      if (!customer?.firstName) {
         return {
            ok: false,
            message: "No se pudo crear la cuenta.",
         };
      }

      const accessTokenResult = await createAccessToken(email, password);

      if (!accessTokenResult?.ok) {
         return {
            ok: false,
            message: accessTokenResult?.message || "La cuenta fue creada, pero no se pudo iniciar sesion automaticamente.",
         };
      }

      return {
         ok: true,
         customer,
         redirectTo: "/store",
      };
   } catch (error) {
      console.error("Error creando cliente en Shopify:", error);

      return {
         ok: false,
         message: "No se pudo completar el registro. Intentalo de nuevo.",
      };
   }
}

export async function handleLogin(previousState, formData) {
   const formDataObject = Object.fromEntries(formData);
   const email = String(formDataObject.email || "").trim().toLowerCase();
   const password = String(formDataObject.password || "");

   if (!email || !password) {
      return {
         ok: false,
         message: "El email y la contrasena son obligatorios.",
      };
   }

   try {
      const accessTokenResult = await createAccessToken(email, password);

      if (accessTokenResult?.accessToken) {
         redirect("/store");
      }

      return {
         ok: false,
         message: accessTokenResult?.message || "No se pudo iniciar sesion.",
      };
   } catch (error) {
      console.error("Error iniciando sesion:", error);

      return {
         ok: false,
         message: "No se pudo iniciar sesion. Intentalo de nuevo.",
      };
   }
}

export async function handleLogout() {
   const cookieStore = await cookies();
   cookieStore.delete("customerAccessToken");

   redirect("/login");
}

export const handleCreateCart = async (cartItems) => {
   try {
      if (!Array.isArray(cartItems) || cartItems.length === 0) {
         return {
            ok: false,
            message: "El carrito esta vacio.",
         };
      }

      const cookiesStore = await cookies();
      const accessToken = cookiesStore.get("customerAccessToken")?.value;

      if (!accessToken) {
         return {
            ok: false,
            message: "Debes iniciar sesion para continuar.",
         };
      }

      const customerResult = await validateAccessToken();

      if (!customerResult?.isValid) {
         return {
            ok: false,
            message: "Sesion invalida o expirada.",
         };
      }

      const graphqlClient = GraphQLClientSingleton.getInstance().getClient();

      const variables = {
         input: {
            buyerIdentity: {
               customerAccessToken: accessToken,
               email: customerResult.customer?.email,
            },
            lines: cartItems.map((item) => ({
               merchandiseId: `gid://shopify/ProductVariant/${item.variantId}`,
               quantity: Number(item.quantity) || 1,
            })),
         },
      };

      const { cartCreate } = await graphqlClient.request(createCartMutation, variables);

      if (cartCreate?.userErrors?.length) {
         return {
            ok: false,
            message: cartCreate.userErrors[0].message,
            errors: cartCreate.userErrors,
         };
      }

      const checkoutUrl = cartCreate?.cart?.checkoutUrl;

      if (!checkoutUrl) {
         return {
            ok: false,
            message: "No se pudo generar la url de checkout.",
         };
      }

      const returnUrl = encodeURIComponent(env.SITE_URL);
      const checkoutUrlWithReturn = `${checkoutUrl}?return_to=${returnUrl}`;

      return {
         ok: true,
         checkoutUrl: checkoutUrlWithReturn,
         cartId: cartCreate.cart.id,
      };
   } catch (error) {
      console.error("Error creando carrito en Shopify:", error);

      return {
         ok: false,
         message: "No se pudo iniciar el checkout. Intentalo de nuevo.",
      };
   }
}