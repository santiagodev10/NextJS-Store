import { cookies } from "next/headers";
import { GraphQLClientSingleton } from "@/graphql";
import { customerName } from "@/graphql/queries/customerName";

export const getCustomerInfo = async () => {
   const cookieStore = await cookies();
   const accessToken = cookieStore.get("customerAccessToken")?.value;

   if (!accessToken) {
      return null;
   }

   try {
      const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
      const { customer } = await graphqlClient.request(customerName, {
         customerAccessToken: accessToken,
      });

      return customer ?? null;
   } catch (error) {
      console.error("Error fetching customer info:", error);
      return null;
   }
};
