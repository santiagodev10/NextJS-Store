"use client"

import Image from "next/image";
import styles from "@/scss/error.module.scss";

export default function GlobalError({ error, reset }) {
   return (
         <main className={styles.errorPage}>
            <section className={styles.errorCard}>
               <div className={styles.copy}>
                  <span className={styles.eyebrow}>Global error</span>
                  <h1 className={styles.title}>An unexpected error has occurred 🥲</h1>
                  <p className={styles.message}>Don't feel bad about it.</p>
               </div>
               <div className={styles.imageFrame}>
                  <Image 
                     className={styles.image}
                     src="/images/error.png"
                     alt="Global error"
                     width={400}
                     height={300}
                     priority
                  />
               </div>
               <button onClick={() => reset()} className={styles.button}>
                  Try again
               </button>
            </section>
         </main>
   );
}