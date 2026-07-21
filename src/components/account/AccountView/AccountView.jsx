import styles from "./AccountView.module.scss";

export const AccountView = ({ customer }) => {
   if (!customer) {
      return (
         <div className={styles.container}>
            <p className={styles.empty}>No se pudo cargar la información del perfil.</p>
         </div>
      );
   }

   const fullName = [customer.firstName, customer.lastName]
      .filter(Boolean)
      .join(" ");

   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <div className={styles.avatar}>
               {customer.firstName?.charAt(0)?.toUpperCase()}
            </div>
            <h2 className={styles.name}>{fullName || "Sin nombre"}</h2>
         </div>

         <div className={styles.info}>
            <div className={styles.field}>
               <span className={styles.label}>Email</span>
               <span className={styles.value}>{customer.email}</span>
            </div>

            {customer.phone && (
               <div className={styles.field}>
                  <span className={styles.label}>Teléfono</span>
                  <span className={styles.value}>{customer.phone}</span>
               </div>
            )}
         </div>
      </div>
   );
};
