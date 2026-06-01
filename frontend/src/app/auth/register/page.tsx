"use client";

import Link from "next/link";
import { useActionState } from "react";

import { register, type RegisterActionState } from "@/src/actions/auth";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

const initialState: RegisterActionState = {
  type: "idle",
  message: "",
};

const Page = () => {
  const [state, formAction] = useActionState(register, initialState);
  const submitAction = formAction as (formData: FormData) => void | Promise<void>;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    startTransition(() => {
      const result = submitAction(formData);
      if (result instanceof Promise) {
        result
          .then(() => {
            console.log("submitAction executed successfully");
            console.log("Current state:", state);
            if (state.type === "success") {
              console.log("Redirecting to /account/dashboard...");
              router.push("/account/dashboard");
            } else {
              console.warn("State type is not 'success'. Forcing redirection...");
              router.push("/account/dashboard");
            }
          })
          .catch((error: unknown) => {
            if (error instanceof Error) {
              console.error("Error during submitAction:", error.message);
            } else {
              console.error("Unknown error during submitAction:", error);
            }
          });
      } else {
        console.log("submitAction executed synchronously");
        console.log("Current state:", state);
        if (state.type === "success") {
          console.log("Redirecting to /account/dashboard...");
          router.push("/account/dashboard");
        } else {
          console.warn("State type is not 'success'. Forcing redirection...");
          router.push("/account/dashboard");
        }
      }
    });
  };

  return (
    <section className={styles.register}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Register</p>
        <form className={styles.form} onSubmit={handleSubmit}>
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
            label="Prénom"
            placeholder="Ton prénom"
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

          <Button type="submit">Créer un compte</Button>

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

        <p className={styles.signupText}>
          Tu as déjà un compte ?{" "}
          <Link href="/auth/login" className={styles.linkPrimary}>
            Se connecter
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Page;