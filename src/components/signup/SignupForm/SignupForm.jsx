"use client";

import { useState } from "react";
import { handleCreateUser } from "@/actions";
import styles from "./SignupForm.module.scss";

export const SignupForm = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [feedback, setFeedback] = useState(null);

   const handleSubmit = async (event) => {
      event.preventDefault();
      setFeedback(null);
      setIsSubmitting(true);

      const formData = new FormData(event.target);

      const result = await handleCreateUser(formData);

      if (!result?.ok) {
         setFeedback({
            type: "error",
            message: result?.message || "No se pudo crear la cuenta.",
         });
         setIsSubmitting(false);
         return;
      }

      setFeedback({
         type: "success",
         message: "Cuenta creada correctamente.",
      });
      event.target.reset();
      setIsSubmitting(false);
   };

   return (
      <section className={styles.signupSection}>
         <h1 className={styles.title}>New account</h1>

         <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
               <label htmlFor="name">Name</label>
               <input id="name" name="name" type="text" autoComplete="given-name" required />
            </div>

            <div className={styles.fieldGroup}>
               <label htmlFor="lastname">Lastname</label>
               <input id="lastname" name="lastname" type="text" autoComplete="family-name" required />
            </div>

            <div className={styles.fieldGroup}>
               <label htmlFor="email">Email</label>
               <input id="email" name="email" type="email" autoComplete="email" required />
            </div>

            <div className={styles.fieldGroup}>
               <label htmlFor="phone">Phone number</label>
               <input id="phone" name="phone" type="tel" autoComplete="tel" required />
            </div>

            <div className={styles.fieldGroup}>
               <label htmlFor="password">Password</label>
               <input id="password" name="password" type="password" autoComplete="new-password" required />
            </div>

            <div className={styles.fieldGroup}>
               <label htmlFor="retypePassword">Re-type password</label>
               <input
                  id="retypePassword"
                  name="retypePassword"
                  type="password"
                  autoComplete="new-password"
                  required
               />
            </div>

            <button className={styles.submitButton} type="submit">
               {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </button>

            {feedback && (
               <p role="status" aria-live="polite">
                  {feedback.message}
               </p>
            )}
         </form>
      </section>
   );
};