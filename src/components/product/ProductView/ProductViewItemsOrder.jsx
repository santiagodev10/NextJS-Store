"use client";

import { useRef } from "react";
import styles from "./ProductViewItemsOrder.module.scss";
import { useStoreWithQuantity } from "@/hooks/useShoppingCart";

const formatPrice = (price) => {
	const value = Number(price);
	if (Number.isNaN(value)) return "N/A";
	return new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	}).format(value);
};

export const ProductViewItemsOrder = ({ id, title, price, quantity, handle }) => {
	const quantityInputRef = useRef(null);
	const stock = Number(quantity) > 0 ? Number(quantity) : 0;
	const addToCart = useStoreWithQuantity((state) => state.addToCart);

	const handleAddToCart = (e) => {
		e.preventDefault();
		const rawValue = Number(quantityInputRef.current?.value);
		const selectedQuantity = Number.isNaN(rawValue)
			? 1
			: Math.min(Math.max(1, rawValue), stock || 1);

		addToCart({ id, title, price, quantity: selectedQuantity, handle });
	};

	return (
		<aside className={styles.ProductViewItemsOrder}>
			<div className={styles.ProductViewItemsOrder__priceWrap}>
				<span className={styles.ProductViewItemsOrder__price}>{formatPrice(price)}</span>
				<span className={styles.ProductViewItemsOrder__stock}>
					{stock > 0 ? `Disponibles: ${stock}` : "Sin stock"}
				</span>
			</div>

			<div className={styles.ProductViewItemsOrder__actions}>
				<label htmlFor="qty" className={styles.ProductViewItemsOrder__label}>Cantidad</label>
				<input
					ref={quantityInputRef}
					id="qty"
					type="number"
					min={1}
					max={stock || 1}
					defaultValue={1}
					disabled={stock === 0}
					className={styles.ProductViewItemsOrder__qty}
				/>
				<button
					type="button"
					disabled={stock === 0}
					className={styles.ProductViewItemsOrder__button}
					onClick={handleAddToCart}
				>
					Agregar al carrito
				</button>
			</div>

			<dl className={styles.ProductViewItemsOrder__meta}>
				<div>
					<dt>ID</dt>
					<dd>{id}</dd>
				</div>
				<div>
					<dt>Handle</dt>
					<dd>{handle}</dd>
				</div>
				<div>
					<dt>Producto</dt>
					<dd>{title}</dd>
				</div>
			</dl>
		</aside>
	);
};
