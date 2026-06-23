import Link from "next/link";
import { handleLogout } from "@/actions";
import { validateAccessToken } from "@/utils/auth/validateAccessToken";
import { ShoppingCart } from "@/components/shared/ShoppingCart";
import styles from "./Header.module.scss";

export const Header = async () => {
    const { isValid, customer } = await validateAccessToken();
    const isLoggedIn = isValid;

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
                    <li>
                        <Link href="/login" className={styles.link}>Login</Link>
                    </li>
                </ul>

                {customer?.firstName ? (
                    <p className={styles.greeting}>Hola <span>{customer.firstName}</span></p>
                ) : <Link href="/login"></Link>}

                <div className={styles.actions}>
                    <ShoppingCart />

                    {isLoggedIn && (
                        <>
                            <span className={styles.loggedInBadge}>Sesión iniciada</span>

                            <form action={handleLogout}>
                                <button className={styles.logoutButton} type="submit">
                                    Logout
                                </button>
                            </form>
                        </>
                    )}

                    <Link href="/signup" className={styles.signupLink}>Signup</Link>
                </div>
            </nav>
        </header>
    );
}