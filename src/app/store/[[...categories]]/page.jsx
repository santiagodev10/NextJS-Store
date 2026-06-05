import { ProductsWrapper } from "@/components/Store/ProductsWrapper";
import { getProducts } from "@/services/shopify/products";
import { getCollections } from "@/services/shopify/collections";
import { getCollectionProducts } from "@/services/shopify/collections";

const buildStoreDescription = (collectionTitle) => {
    if (!collectionTitle) {
        return "Explora todas nuestras colecciones y encuentra productos para tu tienda favorita.";
    }

    return `Explora la colección ${collectionTitle} y descubre productos seleccionados para tu tienda.`;
};

export async function generateMetadata({ params }) {
    const { categories } = await params;

    if (!categories?.length) {
        const description = buildStoreDescription();

        return {
            title: "Store",
            description,
            alternates: {
                canonical: "/store",
            },
            openGraph: {
                title: "Next JS Store | Store",
                description,
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: "Next JS Store | Store",
                description,
            },
        };
    }

    const collections = await getCollections();
    const activeHandle = categories[0];
    const selectedCollection = collections.find(
        (collection) => collection.handle === activeHandle
    );
    const title = selectedCollection?.title || activeHandle;
    const description = buildStoreDescription(title);

    return {
        title,
        description,
        alternates: {
            canonical: `/store/${activeHandle}`,
        },
        openGraph: {
            title: `${title} | Next JS Store`,
            description,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | Next JS Store`,
            description,
        },
    };
}

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