"use client"
import Image from "next/image"
import classNames from "classnames/bind";
import { useState } from "react";
import { imageDescription } from "./images";
import styles from "./Description.module.scss"

export const Description = () => {
    const [ hasBorder, setBorder ] = useState(false);

    const handleClick = () => {
        setBorder(!hasBorder);
    }

    const imageContainerClass = classNames(
        styles["image-container"],
        { [styles.hasBorder]: hasBorder }
    );

    return (
        <section className={styles["hero-container"]}>
            <button className={styles["button-image"]} onClick={handleClick}>
                <div className={imageContainerClass}>
                    <Image src={imageDescription} alt="product description" fill priority quality={75} placeholder="blur" className={styles["hero-image"]} />
                </div>
            </button>
            <div className={styles["description-container"]}>
                <h2 className={styles["description-title"]}>Bring the future today!</h2>
                <p className={styles["description-content"]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eum tempore, inventore id totam ullam. Officiis dolores, veniam incidunt labore eum est inventore quis adipisci, corporis doloremque voluptas perspiciatis blanditiis.</p>
            </div>
        </section>
    );
}