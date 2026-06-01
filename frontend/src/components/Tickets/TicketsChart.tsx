'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Ticket = {
  statut: 'ouvert' | 'en_cours' | 'ferme';
};

type Props = {
  tickets: Ticket[];
};

const COLORS = {
  ouvert: '#ef4444',
  en_cours: '#f59e0b',
  ferme: '#22c55e',
};

const LABELS = {
  ouvert: 'Ouvert',
  en_cours: 'En cours',
  ferme: 'Fermé',
};

const TicketsChart = ({ tickets }: Props) => {
  const data = Object.entries(
    tickets.reduce(
      (acc, ticket) => {
        acc[ticket.statut] = (acc[ticket.statut] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  ).map(([statut, count]) => ({
    name: LABELS[statut as keyof typeof LABELS] || statut,
    value: count,
    statut,
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell
                key={entry.statut}
                fill={COLORS[entry.statut as keyof typeof COLORS] || '#94a3b8'}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TicketsChart;