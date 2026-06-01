import { ProductsWrapper } from "@/components/Store/ProductsWrapper";
import { getProducts } from "@/services/shopify/products";
import { getCollections } from "@/services/shopify/collections";
import { getCollectionProducts } from "@/services/shopify/collections";

export default async function Category({ params, searchParams }) {
    let products = await getProducts();
    const collections = await getCollections();

    const { categories } = await params;
    console.log("Received categories:", categories);

    if (categories?.length > 0) {
        const selectedHandle = categories[0];
        const selectedCollection = collections.find(
            (collection) => collection.handle === selectedHandle
        );

        if (selectedCollection?.id) {
            products = await getCollectionProducts(selectedCollection.id);
        }
    } else {
        products = await getProducts();
    }

    return (
        <ProductsWrapper products={products}  />
    )
}