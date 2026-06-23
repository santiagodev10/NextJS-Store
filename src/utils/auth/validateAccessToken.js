import { cookies } from 'next/headers';
import { GraphQLClientSingleton } from '@/graphql';
import { customerName } from '@/graphql/queries/customerName';

export const validateAccessToken = async () => {
   const cookieStore = await cookies();
   const accessToken = cookieStore.get('customerAccessToken')?.value;

   if (!accessToken) {
      return {
         isValid: false,
         message: 'No access token found.',
      };
   }

   try {
      const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
      const { customer } = await graphqlClient.request(customerName, {
         customerAccessToken: accessToken,
      });

      if (!customer) {
         return {
            isValid: false,
            message: 'Invalid access token.',
         };
      }

      return {
         isValid: true,
         customer,
      };
   } catch {
      return {
         isValid: false,
         message: 'Invalid or expired access token.',
      };
   }
}