"use cliente";

export const MainProducts = () => {
    console.log("Variable de entorno: " + process.env.SHOPIFY_HOST_NAME);

    return (
        <section>
            <h2>Main Products</h2>
        </section>
    );
}