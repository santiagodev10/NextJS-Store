export default async function Layout({ children }) {
    return (
        <main>
            <nav>Navegación de las categorías</nav>
            {children}
        </main>
    );
}