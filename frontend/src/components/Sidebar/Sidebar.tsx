'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { logout } from '@/src/actions/auth';
import Button from '@/src/components/Button';

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: 'Tableau de bord', href: '/account/dashboard' },
    { label: 'Profil', href: '/account/profil' },
    { label: 'Tickets', href: '/account/tickets' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2>Mon espace</h2>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <span
                onClick={() => router.push(item.href)}
                className={`${styles.link} ${
                  pathname === item.href ? styles.active : ''
                }`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <form action={logout}>
          <Button type="submit" variant="secondary">
            Déconnexion
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;