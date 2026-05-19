import Image from "next/image";
import Link from "next/link";
import styles from "./MainProducts.module.scss";

const getProducts = async () => {
    try {
        const response = await fetch(`${process.env.SHOPIFY_HOST_NAME}/admin/api/2025-04/products.json`, {
            headers: new Headers({
                "X-Shopify-Access-Token": process.env.SHOPIFY_API_KEY || ""
            })
        });
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error("Error fetching products:", error); 
    }
}

export const MainProducts = async () => {
    const products = await getProducts();

    if (!products?.length) {
        return (
            <section className={styles.section}>
                <h2 className={styles.title}>Main Products</h2>
                <p className={styles.empty}>No products available right now.</p>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Main Products</h2>

            <div className={styles.grid}>
                {products.map((product) => {
                    const imageSrc = product.image?.src || product.images?.[0]?.src;
                    const price = product.variants?.[0]?.price;
                    const compareAtPrice = product.variants?.[0]?.compare_at_price;
                    const productHref = product.handle ? `/store/${product.handle}` : "/store";

                    return (
                        <article key={product.id} className={styles.card}>
                            <div className={styles.imageContainer}>
                                {imageSrc ? (
                                    <Image
                                        src={imageSrc}
                                        alt={product.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className={styles.image}
                                    />
                                ) : (
                                    <div className={styles.imageFallback}>No image</div>
                                )}
                            </div>

                            <div className={styles.content}>
                                <h3 className={styles.productTitle}>{product.title}</h3>
                                <div className={styles.priceRow}>
                                    {price ? <p className={styles.price}>${price}</p> : null}
                                    {compareAtPrice ? <p className={styles.compareAtPrice}>${compareAtPrice}</p> : null}
                                </div>

                                <div className={styles.actions}>
                                    <Link href={productHref} className={styles.linkButton}>
                                        View product
                                    </Link>
                                    <button type="button" className={styles.cartButton}>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}