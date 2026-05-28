import { ProductCard } from "../ProductCard"
import styles from './ProductsWrapper.module.scss'

export const ProductsWrapper = ({ products }) => {
   return (
      <div className={styles.ProductsWrapper}>
         {products.map((product) => (
         <ProductCard key={product.id} product={product}/>
         ))}
      </div>
   )
}