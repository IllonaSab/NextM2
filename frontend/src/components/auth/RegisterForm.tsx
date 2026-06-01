'use client';

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

import { register, type RegisterActionState } from "@/src/actions/auth";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";

import styles from "./RegisterForm.module.scss";

const initialState: RegisterActionState = {
  type: "idle",
  message: "",
};

const RegisterForm = () => {
  const [state, formAction] = useActionState(register, initialState);
  const submitAction = formAction as (formData: FormData) => void | Promise<void>;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit triggered");
    const formData = new FormData(e.target as HTMLFormElement);
    console.log("Form data:", Object.fromEntries(formData.entries()));

    if (!submitAction) {
      console.error("submitAction is undefined. Please check useActionState initialization.");
      return;
    }

    startTransition(() => {
      const result = submitAction(formData);
      if (result instanceof Promise) {
        result
          .then(() => {
            console.log("submitAction executed successfully");
            if (state.type === "success") {
              console.log("Redirecting to /account/dashboard...");
              router.push("/account/dashboard");
            } else {
              console.warn("State type is not 'success'. Current state:", state);
            }
          })
          .catch((error: unknown) => {
            if (error instanceof Error) {
              console.error("Error message:", error.message);
            } else {
              console.error("Unknown error:", error);
            }
          });
      } else {
        console.log("submitAction executed successfully (synchronous)");
        if (state.type === "success") {
          console.log("Redirecting to /account/dashboard...");
          router.push("/account/dashboard");
        } else {
          console.warn("State type is not 'success'. Current state:", state);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        id="lastname"
        name="lastname"
        type="text"
        label="Nom"
        placeholder="Ton nom"
      />

      <Input
        id="firstname"
        name="firstname"
        type="text"
        label="Prenom"
        placeholder="Ton prenom"
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Adresse email"
        placeholder="vous@exemple.com"
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Mot de passe"
        placeholder="********"
      />

      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirmer le mot de passe"
        placeholder="********"
      />

      <Button type="submit">Creer un compte</Button>

      {state.message ? (
        <p
          className={`${styles.message} ${
            state.type === "error" ? styles.error : styles.success
          }`}
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
};

export default RegisterForm;
