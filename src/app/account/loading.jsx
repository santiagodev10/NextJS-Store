import styles from "./layout.module.scss";

export default function AccountLoading() {
   return (
      <section className={styles.account} aria-busy="true" aria-live="polite">
         <div className={styles.titleSkeleton} />

         <div className={styles.grid}>
            <div className={styles.cardSkeleton}>
               <div className={styles.line} />
               <div className={styles.lineShort} />
               <div className={styles.line} />
               <div className={styles.lineMedium} />
            </div>

            <div className={styles.cardSkeleton}>
               <div className={styles.line} />
               <div className={styles.lineMedium} />
               <div className={styles.lineShort} />
            </div>
         </div>
      </section>
   );
}
