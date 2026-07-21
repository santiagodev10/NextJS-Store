import styles from "./loading.module.scss";

export default function UserInfoLoading() {
   return (
      <div className={styles.container} aria-busy="true" aria-live="polite">
         <div className={styles.card}>
            <div className={styles.avatarSkeleton} />

            <div className={styles.info}>
               <div className={styles.line} />
               <div className={styles.lineMedium} />
               <div className={styles.lineShort} />
            </div>
         </div>
      </div>
   );
}
