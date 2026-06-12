"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { handleLogin } from "@/actions";
import styles from "./LoginForm.module.scss";

const initialState = {
   ok: false,
   message: "",
};

const SubmitButton = () => {
   const { pending } = useFormStatus();

   return (
      <button className={styles.submitButton} type="submit" disabled={pending}>
         {pending ? "Ingresando..." : "Ingresar"}
      </button>
   );
};

export const LoginForm = () => {
   const [state, formAction] = useActionState(handleLogin, initialState);

   return (
      <section className={styles.loginSection}>
         <h1 className={styles.title}>Login</h1>
         <p className={styles.description}>
            Ingresa con tu email y contraseña. Si los datos son correctos, irás directo a la tienda.
         </p>

         <form className={styles.form} action={formAction}>
            <div className={styles.fieldGroup}>
               <label htmlFor="email">Email</label>
               <input id="email" name="email" type="email" autoComplete="email" required />
            </div>

            <div className={styles.fieldGroup}>
               <label htmlFor="password">Password</label>
               <input id="password" name="password" type="password" autoComplete="current-password" required />
            </div>

            <SubmitButton />

            {state?.message && (
               <p className={state.ok ? styles.successMessage : styles.errorMessage} role="status" aria-live="polite">
                  {state.message}
               </p>
            )}
         </form>
      </section>
   );
};