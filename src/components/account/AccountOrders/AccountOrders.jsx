import styles from "./AccountOrders.module.scss";

const STATUS_LABELS = {
   PAID: "Pagado",
   PENDING: "Pendiente",
   REFUNDED: "Reembolsado",
   PARTIALLY_REFUNDED: "Parcialmente reembolsado",
   VOIDED: "Anulado",
   AUTHORIZED: "Autorizado",
};

const FULFILLMENT_LABELS = {
   FULFILLED: "Enviado",
   UNFULFILLED: "Pendiente de envío",
   PARTIALLY_FULFILLED: "Parcialmente enviado",
   SCHEDULED: "Programado",
};

const formatDate = (dateString) => {
   if (!dateString) return "—";

   return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
   });
};

const formatPrice = (amount, currencyCode) => {
   if (!amount || !currencyCode) return "—";

   return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currencyCode,
   }).format(amount);
};

export const AccountOrders = ({ orders }) => {
   if (!orders || orders.length === 0) {
      return (
         <div className={styles.container}>
            <div className={styles.header}>
               <h2 className={styles.title}>Mis Órdenes</h2>
            </div>
            <p className={styles.empty}>Aún no has realizado ninguna orden.</p>
         </div>
      );
   }

   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <h2 className={styles.title}>Mis Órdenes</h2>
            <span className={styles.count}>{orders.length} orden(es)</span>
         </div>

         <div className={styles.ordersList}>
            {orders.map((order) => (
               <article key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                     <div className={styles.orderInfo}>
                        <span className={styles.orderNumber}>
                           #{order.orderNumber}
                        </span>
                        <span className={styles.orderName}>{order.name}</span>
                     </div>
                     <span className={styles.orderDate}>
                        {formatDate(order.processedAt)}
                     </span>
                  </div>

                  <div className={styles.orderBody}>
                     <div className={styles.statusRow}>
                        <div className={styles.statusBadge}>
                           <span className={styles.statusLabel}>Estado:</span>
                           <span className={styles.statusValue}>
                              {STATUS_LABELS[order.financialStatus] ||
                                 order.financialStatus}
                           </span>
                        </div>

                        <div className={styles.statusBadge}>
                           <span className={styles.statusLabel}>Envío:</span>
                           <span className={styles.statusValue}>
                              {FULFILLMENT_LABELS[order.fulfillmentStatus] ||
                                 order.fulfillmentStatus ||
                                 "N/A"}
                           </span>
                        </div>
                     </div>

                     <div className={styles.itemsList}>
                        {order.lineItems?.edges?.map((edge, index) => {
                           const item = edge.node;
                           return (
                              <div key={index} className={styles.item}>
                                 <span className={styles.itemTitle}>
                                    {item.title}
                                 </span>
                                 <span className={styles.itemQuantity}>
                                    x{item.quantity}
                                 </span>
                              </div>
                           );
                        })}
                     </div>
                  </div>

                  <div className={styles.orderFooter}>
                     {order.canceledAt && (
                        <span className={styles.cancelled}>
                           Cancelado: {formatDate(order.canceledAt)}
                        </span>
                     )}

                     {order.statusUrl && (
                        <a
                           href={order.statusUrl}
                           target="_blank"
                           rel="noopener noreferrer"
                           className={styles.statusLink}
                        >
                           Ver estado en Shopify
                        </a>
                     )}
                  </div>
               </article>
            ))}
         </div>
      </div>
   );
};
