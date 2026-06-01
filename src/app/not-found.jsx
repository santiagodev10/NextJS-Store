import Image from "next/image";
import Link from "next/link";
import styles from "@/scss/not-found.module.scss";

export default function NotFound() {
   return (
      <main className={styles.NotFound}>
         <h1 className={styles.NotFound__title}>404</h1>
         <Image
         src="/images/404.png"
         alt="404"
         width={300}
         height={300}
         loading="eager"
         />
         <h2 className={styles.NotFound__subtitle}>
         ¡Ups, it looks like the link disappeared!
         </h2>
         <p className={styles.NotFound__description}>But our store is open 24/7</p>
         <Link className={styles.NotFound__link} href="/store">
         ¡Let's go shopping!
         </Link>
      </main>
   );
}