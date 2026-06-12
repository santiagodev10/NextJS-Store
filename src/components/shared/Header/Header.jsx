import Link from "next/link";
import { cookies } from "next/headers";
import { handleLogout } from "@/actions";
import styles from "./Header.module.scss";

export const Header = async () => {
    const cookieStore = await cookies();
    const isLoggedIn = Boolean(cookieStore.get("customerAccessToken")?.value);

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

                <div className={styles.actions}>
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