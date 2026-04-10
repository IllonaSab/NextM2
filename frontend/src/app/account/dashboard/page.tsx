import Header from "@/src/components/dashboard/Header";
import Graph from "@/src/components/dashboard/Graph";
import Ticket from "@/src/components/dashboard/Ticket";
import { dashboardStats, graphPoints, ticketCards } from "@/src/lib/dashboard";

import styles from "./page.module.scss";

export default function Page() {
  return (
    <section className={styles.dashboard}>
      <Header
        title="Bienvenue sur ton dashboard"
        description="Retrouve ici les informations importantes de ton compte, un suivi visuel de l'activite et tes tickets les plus recents."
      />

      <section className={styles.statsGrid}>
        {dashboardStats.map((stat) => (
          <article key={stat.label} className={styles.statCard}>
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={styles.statDetail}>{stat.detail}</p>
          </article>
        ))}
      </section>

      <section className={styles.mainGrid}>
        <Graph
          title="Activite de la semaine"
          subtitle="Evolution des interactions sur les 7 derniers jours"
          points={graphPoints}
        />

        <article className={styles.ticketPanel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Tickets recents</h3>
            <span className={styles.panelMeta}>{ticketCards.length} elements</span>
          </div>

          <div className={styles.ticketList}>
            {ticketCards.map((ticket) => (
              <Ticket key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </article>
      </section>
    </section>
  );
}
