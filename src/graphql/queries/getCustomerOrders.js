import { gql } from "graphql-request";

export const getCustomerOrdersQuery = gql`
   query getCustomerOrders($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
         firstName
         lastName
         email
         phone
         orders(first: 200) {
            totalCount
            edges {
               node {
                  cancelReason
                  canceledAt
                  currencyCode
                  email
                  financialStatus
                  fulfillmentStatus
                  id
                  name
                  orderNumber
                  phone
                  processedAt
                  statusUrl
                  lineItems(first: 200) {
                     edges {
                        node {
                           currentQuantity
                           quantity
                           title
                        }
                     }
                  }
               }
            }
         }
      }
   }
`;
