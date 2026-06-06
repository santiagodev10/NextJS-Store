import Link from "next/link";
import styles from "./Header.module.scss";

export const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav} aria-label="Primary navigation">
                <ul className={styles.menu}>
                    <li>
                        <Link href="/" className={styles.link}>Home</Link>
                    </li>
                    <li>
                        <Link href="/store" className={styles.link}>Store</Link>
                    </li>
                </ul>

                <Link href="/signup" className={styles.signupLink}>Signup</Link>
            </nav>
        </header>
    );
}