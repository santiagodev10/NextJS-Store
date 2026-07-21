import { getCustomerInfo } from "@/utils/shopify/getCustomerInfo";
import { AccountView } from "@/components/account/AccountView";

export default async function UserInfoPage() {
   const customer = await getCustomerInfo();

   return <AccountView customer={customer} />;
}
