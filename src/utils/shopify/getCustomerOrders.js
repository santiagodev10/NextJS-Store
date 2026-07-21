import { cookies } from "next/headers";
import { GraphQLClientSingleton } from "@/graphql";
import { getCustomerOrdersQuery } from "@/graphql/queries/getCustomerOrders";

export const getCustomerOrders = async () => {
   const cookieStore = await cookies();
   const accessToken = cookieStore.get("customerAccessToken")?.value;

   if (!accessToken) {
      return null;
   }

   try {
      const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
      const data = await graphqlClient.request(getCustomerOrdersQuery, {
         customerAccessToken: accessToken,
      });

      return data?.customer ?? null;
   } catch (error) {
      console.error("Error fetching customer orders:", error);
      return null;
   }
};
