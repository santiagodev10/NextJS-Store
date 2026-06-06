"use server";

export async function handleCreateUser(formData) {
   const payload = Object.fromEntries(formData.entries());

   console.log("Datos de registro:", payload);
}