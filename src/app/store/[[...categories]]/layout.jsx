import { getCollections } from "@/services/shopify/collections";
import Link from "next/link";
import styles from "./layout.module.scss";

export default async function Layout({ children, params }) {
   const collections = await getCollections();
   const activeHandle = params?.categories?.[0] ?? null;

   return (
      <main className={styles.storeLayout}>
         <header className={styles.header}>
            <h1 className={styles.title}>Explore</h1>
            <p className={styles.subtitle}>Browse products by collection</p>
            <nav className={styles.nav} aria-label="Product collections">
               <Link
                  href="/store"
                  className={`${styles.link} ${!activeHandle ? styles.active : ""}`}
               >
                  All
               </Link>
               {collections.map((collection) => (
                  <Link
                     key={collection.id}
                     href={`/store/${collection.handle}`}
                     className={`${styles.link} ${activeHandle === collection.handle ? styles.active : ""}`}
                  >
                     {collection.title}
                  </Link>
               ))}
            </nav>
         </header>
         <section className={styles.content}>{children}</section>
      </main>
   );
}