import { getCollections } from "@/services/shopify/collections";
import Link from "next/link";

export default async function Layout({ children }) {
    const collections = await getCollections();

    return (
        <main>
            <nav>
                {
                    collections.map(collection => (
                        <Link key={collection.id} href={`/store/${collection.handle}`}>
                            {collection.title}
                        </Link>
                    ))
                }
            </nav>
            {children}
        </main>
    );
}