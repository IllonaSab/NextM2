type Ticket = {
  id: number;
  titre: string;
  statut: 'ouvert' | 'en_cours' | 'ferme';
  priorite: 'basse' | 'moyenne' | 'haute';
};

type Props = {
  tickets: Ticket[];
};

const STATUT_COLORS = {
  ouvert: '#ef4444',
  en_cours: '#f59e0b',
  ferme: '#22c55e',
};

const PRIORITE_COLORS = {
  basse: '#94a3b8',
  moyenne: '#f59e0b',
  haute: '#ef4444',
};

const TicketsList = ({ tickets }: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontWeight: 500, color: '#0f172a' }}>{ticket.titre}</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{
              padding: '0.25rem 0.625rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: PRIORITE_COLORS[ticket.priorite] + '20',
              color: PRIORITE_COLORS[ticket.priorite],
            }}>
              {ticket.priorite}
            </span>
            <span style={{
              padding: '0.25rem 0.625rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: STATUT_COLORS[ticket.statut] + '20',
              color: STATUT_COLORS[ticket.statut],
            }}>
              {ticket.statut}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketsList;