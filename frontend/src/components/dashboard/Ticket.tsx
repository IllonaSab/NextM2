import type { Ticket as TicketData } from "@/src/lib/dashboard";

import styles from "./Ticket.module.scss";

type TicketProps = {
  ticket: TicketData;
};

const Ticket = ({ ticket }: TicketProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.id}>{ticket.id}</span>
        <span className={styles.status}>{ticket.status}</span>
      </div>

      <h3 className={styles.title}>{ticket.title}</h3>

      <div className={styles.footer}>
        <span className={styles.priority}>Priorite {ticket.priority}</span>
        <span className={styles.updatedAt}>{ticket.updatedAt}</span>
      </div>
    </article>
  );
};

export default Ticket;
