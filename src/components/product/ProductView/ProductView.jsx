import Image from "next/image";
import { ProductViewItemsOrder } from "./ProductViewItemsOrder";
import styles from "./ProductView.module.scss";

const sanitizeDescription = (description) => {
	if (!description) return "Sin descripcion disponible para este producto.";
	const cleanText = description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
	return cleanText || "Sin descripcion disponible para este producto.";
};

export const ProductView = ({ product }) => {
	const { id, title, description, price, image, quantity, handle, tags } = product;

	return (
		<article className={styles.ProductView}>
			<div className={styles.ProductView__imageWrap}>
				<Image
					src={image?.src || "/images/not-found.webp"}
					alt={image?.alt || title}
					width={760}
					height={760}
					quality={85}
					className={styles.ProductView__image}
					priority
				/>
			</div>

			<div className={styles.ProductView__content}>
				<header className={styles.ProductView__header}>
					<span className={styles.ProductView__handle}>/{handle}</span>
					<h1 className={styles.ProductView__title}>{title}</h1>
				</header>

				<p className={styles.ProductView__description}>{sanitizeDescription(description)}</p>

				{!!tags?.length && (
					<ul className={styles.ProductView__tags}>
						{tags.map((tag) => (
							<li key={tag} className={styles.ProductView__tagItem}>{tag}</li>
						))}
					</ul>
				)}

				<ProductViewItemsOrder
					id={id}
					title={title}
					price={price}
					quantity={quantity}
					handle={handle}
				/>
			</div>
		</article>
	);
};
