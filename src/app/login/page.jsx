import { LoginForm } from "@/components/login/LoginForm";

export const metadata = {
   title: "Login",
   description: "Inicia sesión con tu correo y contraseña para entrar a la tienda.",
};

export default function LoginPage() {
   return (
      <main>
         <LoginForm />
      </main>
   );
}