'use client';

import { useState } from 'react';
import TicketsList from './TicketsList';

type Ticket = {
  id: number;
  titre: string;
  statut: "ouvert" | "en_cours" | "ferme";
  priorite: "basse" | "moyenne" | "haute";
};

type Props = {
  tickets: Ticket[];
};

const STATUTS = ["tous", "ouvert", "en_cours", "ferme"] as const;
const LABELS = {
  tous: "Tous",
  ouvert: "Ouvert",
  en_cours: "En cours",
  ferme: "Fermé",
};

const TicketsFilter = ({ tickets }: Props) => {
  const [statut, setStatut] = useState<string>("tous");

  const filtered = statut === "tous"
    ? tickets
    : tickets.filter((t) => t.statut === statut);

  return (
    <>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {STATUTS.map((s) => (
          <button
            key={s}
            onClick={() => setStatut(s)}
            style={{
              padding: "0.375rem 0.875rem",
              borderRadius: "999px",
              border: "1px solid",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 500,
              backgroundColor: statut === s ? "#4f46e5" : "transparent",
              color: statut === s ? "#ffffff" : "#475569",
              borderColor: statut === s ? "#4f46e5" : "#e2e8f0",
              transition: "all 0.15s ease",
            }}
          >
            {LABELS[s]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "#94a3b8", textAlign: "center", marginTop: "4rem" }}>
          Aucun ticket pour ce statut.
        </p>
      ) : (
        <TicketsList tickets={filtered} />
      )}
    </>
  );
};

export default TicketsFilter;