"use client";

import { useEffect, useRef, useState } from "react";
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

export const ProductViewItemsOrder = ({ id, variantId, title, price, quantity, handle }) => {
	const quantityInputRef = useRef(null);
	const [isAddFeedbackActive, setIsAddFeedbackActive] = useState(false);
	const addFeedbackTimerRef = useRef(null);
	const stock = Number(quantity) > 0 ? Number(quantity) : 0;
	const addToCart = useStoreWithQuantity((state) => state.addToCart);

	useEffect(() => {
		return () => {
			if (addFeedbackTimerRef.current) {
				clearTimeout(addFeedbackTimerRef.current);
			}
		};
	}, []);

	const handleAddToCart = (e) => {
		e.preventDefault();
		const rawValue = Number(quantityInputRef.current?.value);
		const selectedQuantity = Number.isNaN(rawValue)
			? 1
			: Math.min(Math.max(1, rawValue), stock || 1);

		addToCart({ id, variantId, title, price, quantity: selectedQuantity, handle });

		setIsAddFeedbackActive(false);
		if (addFeedbackTimerRef.current) {
			clearTimeout(addFeedbackTimerRef.current);
		}

		requestAnimationFrame(() => {
			setIsAddFeedbackActive(true);
		});

		addFeedbackTimerRef.current = setTimeout(() => {
			setIsAddFeedbackActive(false);
		}, 460);
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
					className={`${styles.ProductViewItemsOrder__button} ${isAddFeedbackActive ? styles.ProductViewItemsOrder__buttonAdded : ""}`}
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
