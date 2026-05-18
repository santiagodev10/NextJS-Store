const getProducts = async () => {
    const response = await fetch(`${process.env.SHOPIFY_HOST_NAME}/admin/api/2025-04/products.json`, {
        headers: new Headers({
            "X-Shopify-Access-Token": process.env.SHOPIFY_API_KEY || ""
        })
    });
    const data = await response.json();
    return data.products;
}

export const MainProducts = async () => {
    const products = await getProducts();
    console.log(products);

    return (
        <section>
            <h2>Main Products</h2>
        </section>
    );
}