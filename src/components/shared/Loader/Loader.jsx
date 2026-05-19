import styles from "./Loader.module.scss";

export const Loader = () => {
      return (
         <section className={styles.section} aria-busy="true" aria-live="polite" aria-label="Loading content">
               <div className={styles.header}>
                  <div className={styles.title} />
                  <div className={styles.subtitle} />
               </div>

               <div className={styles.grid}>
                  {Array.from({ length: 8 }).map((_, index) => (
                     <article key={index} className={styles.card}>
                           <div className={styles.image} />
                           <div className={styles.content}>
                              <div className={styles.lineLarge} />
                              <div className={styles.lineMedium} />
                              <div className={styles.actions}>
                                 <div className={styles.button} />
                                 <div className={styles.button} />
                              </div>
                           </div>
                     </article>
                  ))}
               </div>
         </section>
      );
};