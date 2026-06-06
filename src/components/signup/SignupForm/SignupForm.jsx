"use client";

import { handleCreateUser } from "@/actions";
import styles from "./SignupForm.module.scss";

export const SignupForm = () => {
   const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      await handleCreateUser(formData);
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
               Crear cuenta
            </button>
         </form>
      </section>
   );
};