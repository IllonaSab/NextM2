'use client';

import { useActionState } from "react";

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

  return (
    <form action={submitAction} className={styles.form}>
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
