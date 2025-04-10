
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';
import { Database } from '@/integrations/supabase/types';

type Donation = Database['public']['Tables']['donations']['Row'];

const DonationReport = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data, isLoading } = useSupabaseFetch<Donation>({
    table: 'donations',
    order: { column: 'month', ascending: true }
  });
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Relatório Financeiro</CardTitle>
          <CardDescription>Dízimos e ofertas nos últimos 6 meses</CardDescription>
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
        <CardTitle className="text-lg font-semibold">Relatório Financeiro</CardTitle>
        <CardDescription>Dízimos e ofertas nos últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`R$ ${value}`, undefined]}
              labelFormatter={(label) => `Mês: ${label}`}
            />
            <Area type="monotone" dataKey="tithes" name="Dízimos" stackId="1" stroke="#6B46C1" fill="#6B46C1" />
            <Area type="monotone" dataKey="offerings" name="Ofertas" stackId="1" stroke="#F6E05E" fill="#F6E05E" />
            <Area type="monotone" dataKey="projects" name="Projetos" stackId="1" stroke="#4299E1" fill="#4299E1" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DonationReport;
