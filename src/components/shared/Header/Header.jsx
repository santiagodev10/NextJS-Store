import Link from "next/link";
import { handleLogout } from "@/actions";
import { validateAccessToken } from "@/utils/auth/validateAccessToken";
import { ShoppingCart } from "@/components/shared/ShoppingCart";
import { BsChatDots } from "react-icons/bs";
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
                        <Link href="/chat" className={styles.link}>
                            <BsChatDots style={{ marginRight: '0.35rem' }} />
                            Chat
                        </Link>
                    </li>
                    {!isLoggedIn && (
                        <li>
                            <Link href="/login" className={styles.link}>Login</Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <Link href="/account" className={styles.link}>Mi Cuenta</Link>
                        </li>
                    )}
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

                    {!isLoggedIn && (
                        <Link href="/signup" className={styles.signupLink}>Signup</Link>
                    )}
                </div>
            </nav>
        </header>
    );
}