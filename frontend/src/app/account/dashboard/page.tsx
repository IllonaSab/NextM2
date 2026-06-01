import { cookies } from "next/headers";
import TicketsChart from "@/src/components/Tickets/TicketsChart";
import TicketsList from "@/src/components/Tickets/TicketsList";

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
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  const tickets = await getTickets(token);

  return (
    <>
      <h1 style={{ marginBottom: "2rem", color: "#0f172a" }}>
        Tableau de bord
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "1rem",
          padding: "1.5rem",
          border: "1px solid #e2e8f0",
        }}>
          <h2 style={{ marginBottom: "1rem", fontSize: "1rem", color: "#475569" }}>
            Statut des tickets
          </h2>
          <TicketsChart tickets={tickets} />
        </div>

        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "1rem",
          padding: "1.5rem",
          border: "1px solid #e2e8f0",
        }}>
          <h2 style={{ marginBottom: "1rem", fontSize: "1rem", color: "#475569" }}>
            Mes tickets ({tickets.length})
          </h2>
          <TicketsList tickets={tickets} />
        </div>
      </div>
    </>
  );
}