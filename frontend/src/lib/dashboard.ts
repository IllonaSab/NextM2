export type DashboardLink = {
  href: string;
  label: string;
};

export type DashboardStat = {
  label: string;
  value: string;
  detail: string;
};

export type Ticket = {
  id: string;
  title: string;
  status: string;
  priority: string;
  updatedAt: string;
};

export type GraphPoint = {
  label: string;
  value: number;
};

export const dashboardLinks: DashboardLink[] = [
  { href: "/account/dashboard", label: "Dashboard" },
  { href: "/account/profil", label: "Profil" },
  { href: "/account/tickets", label: "Tickets" },
];

export const dashboardStats: DashboardStat[] = [
  { label: "Reservations actives", value: "03", detail: "2 a venir cette semaine" },
  { label: "Tickets ouverts", value: "12", detail: "4 demandes en attente" },
  { label: "Messages recus", value: "08", detail: "Derniere reponse il y a 2h" },
];

export const ticketCards: Ticket[] = [
  {
    id: "#2481",
    title: "Badge d'acces non recu",
    status: "En cours",
    priority: "Haute",
    updatedAt: "Mis a jour il y a 2h",
  },
  {
    id: "#2474",
    title: "Modification d'une reservation",
    status: "Nouveau",
    priority: "Moyenne",
    updatedAt: "Mis a jour ce matin",
  },
  {
    id: "#2458",
    title: "Facture de mars",
    status: "Resolu",
    priority: "Basse",
    updatedAt: "Mis a jour hier",
  },
];

export const graphPoints: GraphPoint[] = [
  { label: "Lun", value: 42 },
  { label: "Mar", value: 58 },
  { label: "Mer", value: 51 },
  { label: "Jeu", value: 74 },
  { label: "Ven", value: 68 },
  { label: "Sam", value: 35 },
  { label: "Dim", value: 49 },
];
