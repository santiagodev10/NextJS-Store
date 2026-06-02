export default async function ProductPage({ params, searchParams }) {
   const { handle } = await params;
   const { id } = await searchParams;

   console.log("Received params:", handle);
   console.log("Received searchParams:", id);

   return (
      <h1>Hello world</h1>
   )
}