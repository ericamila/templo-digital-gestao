
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Donation, FinancialTransaction } from '@/types/supabase';

interface OverviewTabProps {
  donationsLoading: boolean;
  transactionsLoading: boolean;
  donations: Donation[];
  totalIncome: number;
  totalExpense: number;
  formatCurrency: (value: number) => string;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export function OverviewTab({ 
  donationsLoading, 
  transactionsLoading, 
  donations, 
  totalIncome, 
  totalExpense, 
  formatCurrency 
}: OverviewTabProps) {
  // Dados para gráficos
  const pieChartData = donations.length > 0 ? [
    { name: 'Dízimos', value: Number(donations[0]?.tithes || 0) },
    { name: 'Ofertas', value: Number(donations[0]?.offerings || 0) },
    { name: 'Projetos', value: Number(donations[0]?.projects || 0) }
  ] : [];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Gráfico de Doações */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Doações</CardTitle>
          <CardDescription>
            Distribuição das doações do mês atual
          </CardDescription>
        </CardHeader>
        <CardContent>
          {donationsLoading ? (
            <div className="flex items-center justify-center h-80">
              <p>Carregando...</p>
            </div>
          ) : donations.length > 0 ? (
            <div className="h-80 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-80">
              <p>Nenhuma doação registrada</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gráfico de Receitas/Despesas */}
      <Card>
        <CardHeader>
          <CardTitle>Receitas vs Despesas</CardTitle>
          <CardDescription>
            Comparação entre receitas e despesas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transactionsLoading ? (
            <div className="flex items-center justify-center h-80">
              <p>Carregando...</p>
            </div>
          ) : (totalIncome > 0 || totalExpense > 0) ? (
            <div className="h-80 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Receitas', value: totalIncome },
                    { name: 'Despesas', value: totalExpense }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name="Valor" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-80">
              <p>Nenhuma transação registrada</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
