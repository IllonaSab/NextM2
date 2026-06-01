'use client';

import { useActionState } from "react";

import { login, type LoginActionState } from "@/src/actions/auth";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";

import styles from "./LoginForm.module.scss";

const initialState: LoginActionState = {
  type: "idle",
  message: "",
};

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction} className={styles.form}>
      <Input
        id="email"
        name="email"
        type="email"
        label="Adresse email"
        placeholder="vous@exemple.com"
        disabled={isPending}
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Mot de passe"
        hint={
          <a href="#" className={styles.linkMuted}>
            Mot de passe oublié ?
          </a>
        }
        placeholder="********"
        disabled={isPending}
      />

      <label className={styles.checkboxRow}>
        <input type="checkbox" className={styles.checkbox} disabled={isPending} />
        <span>Se souvenir de moi</span>
      </label>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Connexion en cours..." : "Se connecter"}
      </Button>

      {state.type === "error" && state.message ? (
        <p className={`${styles.message} ${styles.error}`} aria-live="polite">
          {state.message}
        </p>
      ) : null}
    </form>
  );
};

export default LoginForm;