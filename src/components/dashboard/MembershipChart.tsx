
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface MembershipData {
  month: string;
  members: number;
  visitors: number;
}

const mockData: MembershipData[] = [
  { month: 'Jan', members: 120, visitors: 20 },
  { month: 'Fev', members: 132, visitors: 25 },
  { month: 'Mar', members: 141, visitors: 30 },
  { month: 'Abr', members: 145, visitors: 28 },
  { month: 'Mai', members: 158, visitors: 35 },
  { month: 'Jun', members: 162, visitors: 40 },
];

const MembershipChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Crescimento da Membresia</CardTitle>
          <CardDescription>Membros e visitantes nos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <p>Carregando gráfico...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Crescimento da Membresia</CardTitle>
        <CardDescription>Membros e visitantes nos últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={mockData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [value, name === 'members' ? 'Membros' : 'Visitantes']} 
              labelFormatter={(label) => `Mês: ${label}`}
            />
            <Bar dataKey="members" name="Membros" fill="#6B46C1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="visitors" name="Visitantes" fill="#F6E05E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MembershipChart;
