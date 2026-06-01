import Sidebar from "@/src/components/Sidebar/Sidebar";

import styles from "./layout.module.scss";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.accountShell}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
