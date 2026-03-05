import styles from "./Description.module.scss"
import Image from "next/image"

export const Description = () => {
    return (
        <section className={styles["hero-container"]}>
            {/* <img className={styles["hero-image"]} src="/images/description.jpeg" alt="product description" /> */}
            <Image className={styles["hero-image"]} src="/images/description.jpeg" alt="product description" width={500} height={300} priority={true} quality={75} />
            <div className={styles["description-container"]}>
                <h2 className={styles["description-title"]}>Bring the future today!</h2>
                <p className={styles["description-content"]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eum tempore, inventore id totam ullam. Officiis dolores, veniam incidunt labore eum est inventore quis adipisci, corporis doloremque voluptas perspiciatis blanditiis.</p>
            </div>
        </section>
    );
}