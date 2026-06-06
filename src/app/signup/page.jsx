import { SignupForm } from "@/components/signup/SignupForm";

export const metadata = {
   title: "Signup",
   description: "Crea tu cuenta para empezar a comprar en Next JS Store.",
};

export default function SignupPage() {
   return (
      <main>
         <SignupForm />
      </main>
   );
}