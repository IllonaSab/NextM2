import Link from "next/link";

import Button from "@/src/components/Button";
import Input from "@/src/components/Input";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <section className={styles.login}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Login</p>
        <form className={styles.form}>
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

          <Button type="submit">
            Se connecter
          </Button>
        </form>

        <p className={styles.signupText}>
          Tu n&apos;as pas encore de compte ?{" "}
          <Link href="/auth/register" className={styles.linkPrimary}>
            Créer un compte
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Page;