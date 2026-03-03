import styles from './Hero.module.scss';

export const Hero = () => {
    return (
        <section>
            <h1 className={styles.hero}>NextJS Store</h1>
            <h2 className={styles.slogan}>Empowering Your Tomorrow, Today!</h2>
        </section>
    );
}