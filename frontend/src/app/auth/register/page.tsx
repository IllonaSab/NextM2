import Link from "next/link";

import Button from "@/src/components/Button";
import Input from "@/src/components/Input";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <section className={styles.register}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Register</p>
        <form className={styles.form}>
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
        </form>

        <p className={styles.signupText}>
          Tu as déja un compte ?{" "}
          <Link href="/auth/login" className={styles.linkPrimary}>
            Se connecter
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Page;