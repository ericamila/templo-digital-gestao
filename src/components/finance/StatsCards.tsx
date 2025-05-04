
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardsProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  formatCurrency: (value: number) => string;
}

export function StatsCards({ balance, totalIncome, totalExpense, formatCurrency }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className={balance >= 0 ? "border-l-4 border-l-green-500" : "border-l-4 border-l-red-500"}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(balance)}
          </div>
          <p className="text-xs text-muted-foreground">
            Diferença entre receitas e despesas
          </p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receitas Totais</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
          <p className="text-xs text-muted-foreground">
            Total de receitas registradas
          </p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas Totais</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalExpense)}</div>
          <p className="text-xs text-muted-foreground">
            Total de despesas registradas
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
