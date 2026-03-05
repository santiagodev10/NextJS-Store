import styles from "./Description.module.scss"
import Image from "next/image"
import { imageDescription } from "./images";

export const Description = () => {
    return (
        <section className={styles["hero-container"]}>
            <div className={styles["image-container"]}>
                <Image src={imageDescription} alt="product description" fill priority quality={75} placeholder="blur" className={styles["hero-image"]} />
            </div>
            <div className={styles["description-container"]}>
                <h2 className={styles["description-title"]}>Bring the future today!</h2>
                <p className={styles["description-content"]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eum tempore, inventore id totam ullam. Officiis dolores, veniam incidunt labore eum est inventore quis adipisci, corporis doloremque voluptas perspiciatis blanditiis.</p>
            </div>
        </section>
    );
}