import { GraphQLClient } from "graphql-request";
import { env } from "@/config/env";

let graphqlClientInstance;

export class GraphQLClientSingleton {
   constructor() {
      this.client = new GraphQLClient(env.SHOPIFY_GRAPHQL_ENDPOINT, {
         headers: {
            "Shopify-Storefront-Private-Token": env.SHOPIFY_STOREFRONT_TOKEN,
         },
      });
   }

   static getInstance() {
      if (!graphqlClientInstance) {
         graphqlClientInstance = new GraphQLClientSingleton();
      }

      return graphqlClientInstance;
   }

   getClient() {
      return this.client;
   }
}

export const getGraphQLClient = () => GraphQLClientSingleton.getInstance().getClient();

export const shopifyRequest = async (document, variables = {}) => {
   return getGraphQLClient().request(document, variables);
};

export const shopifyQuery = shopifyRequest;
export const shopifyMutation = shopifyRequest;