import { cookies } from "next/headers";
import TicketsFilter from "@/src/components/Tickets/TicketsFilter";

type StrapiTicket = {
  id: number;
  titre: string;
  statut: "ouvert" | "en_cours" | "ferme";
  priorite: "basse" | "moyenne" | "haute";
};

async function getTickets(token: string) {
  const response = await fetch(
    "http://localhost:1337/api/tickets?populate=*",
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!response.ok) return [];

  const data = await response.json();
  return data.data.map((item: StrapiTicket) => ({
    id: item.id,
    titre: item.titre,
    statut: item.statut,
    priorite: item.priorite,
  }));
}

export default async function TicketsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const tickets = await getTickets(token);

  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
      }}>
        <h1 style={{ color: "#0f172a" }}>Mes tickets ({tickets.length})</h1>
        <a
          href="/account/tickets/create"
          style={{
            padding: "0.625rem 1.25rem",
            backgroundColor: "#67e8f9",
            borderRadius: "0.5rem",
            textDecoration: "none",
            fontWeight: 600,
            color: "#0f172a",
            fontSize: "0.9rem",
          }}
        >
          + Nouveau ticket
        </a>
      </div>

      <TicketsFilter tickets={tickets} />
    </>
  );
}