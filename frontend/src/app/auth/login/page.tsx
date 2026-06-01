"use client";

import Link from "next/link";
import LoginForm from "@/src/components/auth/LoginForm";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <section className={styles.login}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Login</p>
        <LoginForm />
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