export default async function Category({ params, searchParams }) {
    const { categories } = await params;
    // Se asigna el resultado del await a una variable, dado que searchParams es una promesa, y luego se puede usar esa variable para acceder a los datos resueltos.
    const queryParams = await searchParams;
    
    // Ahora imprime la variable resuelta
    console.log(queryParams);
    console.log(categories);

    return (
        <h1>The category is: {categories}</h1>
    )
}