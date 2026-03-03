import styles from "./Description.module.scss"

export const Description = () => {
    return (
        <section>
            <img className={styles["hero-image"]} src="/images/description.jpeg" alt="product description" />
            <h2>Description</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eum tempore, inventore id totam ullam. Officiis dolores, veniam incidunt labore eum est inventore quis adipisci, corporis doloremque voluptas perspiciatis blanditiis.</p>
        </section>
    );
}