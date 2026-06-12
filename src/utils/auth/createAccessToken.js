import { GraphQLClientSingleton } from '@/graphql';
import { customerAccessTokenCreateMutation } from '@/graphql/mutations/customerAccessTokenCreate';
import { cookies } from "next/headers";

export const createAccessToken = async (email, password) => {
   const cookieStore = await cookies();
   const client = GraphQLClientSingleton.getInstance().getClient();

   const { customerAccessTokenCreate } = await client.request(customerAccessTokenCreateMutation, {
      "email": email,
      "password": password
   });

   const { customerAccessToken, customerUserErrors } = customerAccessTokenCreate || {};

   if (customerUserErrors?.length) {
      return {
         ok: false,
         message: customerUserErrors[0].message,
      };
   }

   const { accessToken, expiresAt } = customerAccessToken || {};

   if (!accessToken) {
      return {
         ok: false,
         message: "No se pudo crear el token de acceso.",
      };
   }

   const expires = expiresAt ? new Date(expiresAt) : undefined;
   const maxAge = expires ? Math.max(0, Math.floor((expires.getTime() - Date.now()) / 1000)) : undefined;

   cookieStore.set("customerAccessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      ...(expires ? { expires } : {}),
      ...(typeof maxAge === "number" ? { maxAge } : {}),
   });

   return {
      ok: true,
      accessToken,
      expiresAt,
   };
}