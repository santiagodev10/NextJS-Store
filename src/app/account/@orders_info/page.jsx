import { getCustomerOrders } from "@/utils/shopify/getCustomerOrders";
import { AccountOrders } from "@/components/account/AccountOrders";

export default async function OrdersInfoPage() {
   const customer = await getCustomerOrders();
   const orders = customer?.orders?.edges?.map((edge) => edge.node) ?? [];

   return <AccountOrders orders={orders} />;
}
