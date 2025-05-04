
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileHeart } from 'lucide-react';
import { Account, AccountCategory } from '@/types/supabase';

interface AccountsTabProps {
  accountCategories: AccountCategory[];
  accounts: Account[];
  categoriesLoading: boolean;
  accountsLoading: boolean;
}

export function AccountsTab({ 
  accountCategories, 
  accounts, 
  categoriesLoading, 
  accountsLoading 
}: AccountsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plano de Contas</CardTitle>
        <CardDescription>
          Plano de contas da igreja para gerenciamento financeiro
        </CardDescription>
      </CardHeader>
      <CardContent>
        {accountsLoading || categoriesLoading ? (
          <div className="flex items-center justify-center h-40">
            <p>Carregando plano de contas...</p>
          </div>
        ) : accountCategories && accountCategories.length > 0 ? (
          <div className="space-y-8">
            {accountCategories.map((category) => {
              const categoryAccounts = accounts.filter(account => account.category_id === category.id);
              
              return (
                <div key={category.id} className="space-y-4">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoryAccounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell className="font-medium">
                            {account.code}
                          </TableCell>
                          <TableCell>
                            {account.name}
                          </TableCell>
                          <TableCell>
                            {account.description || '-'}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              account.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {account.is_active ? 'Ativo' : 'Inativo'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3 p-6">
            <FileHeart className="h-8 w-8 text-muted-foreground" />
            <p>Nenhuma conta registrada no plano de contas</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
