import Button from "@/src/components/Button";
import Form from "@/src/components/Form";
import Input from "@/src/components/Input";

import styles from "./Header.module.scss";

type HeaderProps = {
  title: string;
  description: string;
};

const Header = ({ title, description }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.copy}>
        <p className={styles.kicker}>Vue d&apos;ensemble</p>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.tools}>
        <div className={styles.badge}>
          <span className={styles.badgeLabel}>Statut</span>
          <strong className={styles.badgeValue}>Compte actif</strong>
        </div>

        <Form className={styles.form}>
          <Input
            id="search"
            name="search"
            type="text"
            label="Recherche rapide"
            placeholder="Ticket, reservation, facture..."
          />
          <Button type="submit">Rechercher</Button>
        </Form>
      </div>
    </header>
  );
};

export default Header;
