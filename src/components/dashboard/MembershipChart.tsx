
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';
import { Database } from '@/integrations/supabase/types';

type MembershipStat = Database['public']['Tables']['membership_stats']['Row'];

const MembershipChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data, isLoading } = useSupabaseFetch<MembershipStat>({
    table: 'membership_stats',
    order: { column: 'month', ascending: true }
  });
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoading) {
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
            data={data}
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
