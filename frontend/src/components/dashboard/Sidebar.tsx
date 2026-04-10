import Link from "next/link";

import { dashboardLinks } from "@/src/lib/dashboard";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div>
        <p className={styles.kicker}>Mon espace</p>
        <h1 className={styles.brand}>Dashboard</h1>
        <p className={styles.copy}>
          Suis tes reservations, tes tickets et les prochaines actions utiles.
        </p>
      </div>

      <nav className={styles.nav}>
        {dashboardLinks.map((link) => (
          <Link key={link.href} href={link.href} className={styles.navLink}>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
