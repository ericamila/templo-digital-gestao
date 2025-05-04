
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, PlusCircle } from 'lucide-react';
import { Donation } from '@/types/supabase';

interface DonationsTabProps {
  donations: Donation[];
  donationsLoading: boolean;
  setIsDonationDialogOpen: (value: boolean) => void;
  formatCurrency: (value: number) => string;
  formatMonthYear: (month: string) => string;
}

export function DonationsTab({ 
  donations, 
  donationsLoading, 
  setIsDonationDialogOpen, 
  formatCurrency, 
  formatMonthYear 
}: DonationsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doações</CardTitle>
        <CardDescription>
          Registro de doações por mês
        </CardDescription>
      </CardHeader>
      <CardContent>
        {donationsLoading ? (
          <div className="flex items-center justify-center h-40">
            <p>Carregando doações...</p>
          </div>
        ) : donations && donations.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mês</TableHead>
                <TableHead className="text-right">Dízimos</TableHead>
                <TableHead className="text-right">Ofertas</TableHead>
                <TableHead className="text-right">Projetos</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation) => {
                const total = Number(donation.tithes) + Number(donation.offerings) + Number(donation.projects);
                
                return (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">
                      {formatMonthYear(donation.month)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(Number(donation.tithes))}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(Number(donation.offerings))}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(Number(donation.projects))}
                    </TableCell>
                    <TableCell className="font-semibold text-right">
                      {formatCurrency(total)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3 p-6">
            <DollarSign className="h-8 w-8 text-muted-foreground" />
            <p>Nenhuma doação registrada</p>
            <Button onClick={() => setIsDonationDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Registrar Nova Doação
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
