import { redirect } from "next/navigation";
import { validateAccessToken } from "@/utils/auth/validateAccessToken";
import styles from "./layout.module.scss";

export default async function AccountLayout({ children, user_info, orders_info }) {
   const { isValid } = await validateAccessToken();

   if (!isValid) {
      redirect("/login");
   }

   return (
      <section className={styles.account}>
         <h1 className={styles.title}>Mi Cuenta</h1>
         <div className={styles.grid}>
            {user_info}
            {orders_info}
         </div>
         {children}
      </section>
   );
}
