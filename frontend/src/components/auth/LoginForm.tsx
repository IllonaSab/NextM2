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
  const [state, formAction] = useActionState(login, initialState);
  const submitAction = formAction as (formData: FormData) => void | Promise<void>;

  return (
    <form action={login} className={styles.form}>
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
        hint={
          <a href="#" className={styles.linkMuted}>
            Mot de passe oublie ?
          </a>
        }
        placeholder="********"
      />

      <label className={styles.checkboxRow}>
        <input type="checkbox" className={styles.checkbox} />
        <span>Se souvenir de moi</span>
      </label>

      <Button type="submit">Se connecter</Button>

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

export default LoginForm;
