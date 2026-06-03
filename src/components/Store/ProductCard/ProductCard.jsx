import Image from "next/image";
import Link from "next/link";
import styles from './ProductCard.module.scss'

export const ProductCard = ({ product }) => {
   return (
      <Link href={`/product/${product.handle}?id=${product.id}`} className={styles.ProductCard__link}>
         <article className={styles.ProductCard}>
         <Image
            src={product.image?.src}
            alt={product.image?.alt || product.title}
            quality={80}
            height={320}
            width={320}
            loading="eager"
         />
         <div className={styles.ProductCard__info}>
            <h3>{product.title}</h3>
         </div>
         <span className={styles.ProductCard__priceTag}>${product.price} USD</span>
         </article>
      </Link>
   );
};