import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { GraphQLClientSingleton } from "@/graphql";
import { getCustomerOrdersQuery } from "@/graphql/queries/getCustomerOrders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
   const cookieStore = await cookies();
   const accessToken = cookieStore.get("customerAccessToken")?.value;

   if (!accessToken) {
      return NextResponse.json({ orders: [], hasNewOrders: false });
   }

   try {
      const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
      const data = await graphqlClient.request(getCustomerOrdersQuery, {
         customerAccessToken: accessToken,
      });

      const orders = data?.customer?.orders?.edges?.map((edge) => edge.node) ?? [];

      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

      const recentOrders = orders.filter(
         (order) => order.processedAt && order.processedAt > oneHourAgo
      );

      return NextResponse.json({
         orders: recentOrders,
         hasNewOrders: recentOrders.length > 0,
      });
   } catch (error) {
      console.error("[API] Error fetching recent orders:", error);
      return NextResponse.json({ orders: [], hasNewOrders: false });
   }
}
