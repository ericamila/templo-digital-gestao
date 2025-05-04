
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, PlusCircle } from 'lucide-react';
import { FinancialTransaction } from '@/types/supabase';

interface TransactionsTabProps {
  transactions: FinancialTransaction[];
  transactionsLoading: boolean;
  setIsTransactionDialogOpen: (value: boolean) => void;
  formatCurrency: (value: number) => string;
  getAccountName: (accountId: string | null) => string;
}

export function TransactionsTab({ 
  transactions, 
  transactionsLoading, 
  setIsTransactionDialogOpen, 
  formatCurrency, 
  getAccountName 
}: TransactionsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações Financeiras</CardTitle>
        <CardDescription>
          Registro de todas as transações financeiras
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactionsLoading ? (
          <div className="flex items-center justify-center h-40">
            <p>Carregando transações...</p>
          </div>
        ) : transactions && transactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Conta</TableHead>
                <TableHead>Método</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Tipo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell>
                    {transaction.category}
                  </TableCell>
                  <TableCell>
                    {getAccountName(transaction.account_id)}
                  </TableCell>
                  <TableCell>
                    {transaction.payment_method || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(Number(transaction.amount))}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3 p-6">
            <DollarSign className="h-8 w-8 text-muted-foreground" />
            <p>Nenhuma transação registrada</p>
            <Button onClick={() => setIsTransactionDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Registrar Nova Transação
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
