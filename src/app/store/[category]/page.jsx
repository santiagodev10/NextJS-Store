export default async function Category({ params }) {
    const { category } = await params;

    return (
        <h1>The category is: {category}</h1>
    )
}