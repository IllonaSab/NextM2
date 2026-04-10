import type { GraphPoint } from "@/src/lib/dashboard";

import styles from "./Graph.module.scss";

type GraphProps = {
  title: string;
  subtitle: string;
  points: GraphPoint[];
};

const Graph = ({ title, subtitle, points }: GraphProps) => {
  const max = Math.max(...points.map((point) => point.value), 1);

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <span className={styles.meta}>7 jours</span>
      </div>

      <div className={styles.chart}>
        {points.map((point) => (
          <div key={point.label} className={styles.column}>
            <div
              className={styles.bar}
              style={{ height: `${(point.value / max) * 100}%` }}
            />
            <span className={styles.label}>{point.label}</span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Graph;
