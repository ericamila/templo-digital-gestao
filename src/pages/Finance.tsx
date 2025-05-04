
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';
import { Donation, FinancialTransaction, Account, AccountCategory } from '@/types/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { DollarSign, PlusCircle, TrendingUp, TrendingDown, FileChart } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const Finance = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  
  const [newDonation, setNewDonation] = useState({
    month: new Date().toISOString().slice(0, 7), // YYYY-MM
    tithes: '',
    offerings: '',
    projects: ''
  });

  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    category: '',
    description: '',
    amount: '',
    type: 'income',
    payment_method: '',
    reference_number: '',
    account_id: ''
  });

  // Buscar doações
  const { data: donations, isLoading: donationsLoading } = useSupabaseFetch<Donation>({
    table: 'donations',
    order: { column: 'month', ascending: false }
  });

  // Buscar transações financeiras
  const { data: transactions, isLoading: transactionsLoading } = useSupabaseFetch<FinancialTransaction>({
    table: 'financial_transactions',
    order: { column: 'date', ascending: false }
  });

  // Buscar categorias de contas
  const { data: accountCategories, isLoading: categoriesLoading } = useSupabaseFetch<AccountCategory>({
    table: 'account_categories',
    order: { column: 'name', ascending: true }
  });

  // Buscar contas
  const { data: accounts, isLoading: accountsLoading } = useSupabaseFetch<Account>({
    table: 'accounts',
    order: { column: 'code', ascending: true }
  });

  // Dados para gráficos
  const pieChartData = donations.length > 0 ? [
    { name: 'Dízimos', value: Number(donations[0]?.tithes || 0) },
    { name: 'Ofertas', value: Number(donations[0]?.offerings || 0) },
    { name: 'Projetos', value: Number(donations[0]?.projects || 0) }
  ] : [];

  // Processar transações para obter totais
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const balance = totalIncome - totalExpense;

  // Preparar dados para gráfico por categorias
  const accountsWithCategory = accounts.map(account => {
    const category = accountCategories.find(cat => cat.id === account.category_id);
    return {
      ...account,
      categoryName: category?.name || '',
      categoryType: category?.type || ''
    };
  });

  // Manipuladores de formulários
  const handleCreateDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const [year, month] = newDonation.month.split('-');
      const formattedMonth = `${year}-${month}`;
      
      const donationData = {
        month: formattedMonth,
        tithes: parseFloat(newDonation.tithes) || 0,
        offerings: parseFloat(newDonation.offerings) || 0,
        projects: parseFloat(newDonation.projects) || 0
      };

      const { error } = await supabase
        .from('donations')
        .insert([donationData]);
      
      if (error) throw error;
      
      toast.success('Doação registrada com sucesso!');
      setIsDonationDialogOpen(false);
      setNewDonation({ 
        month: new Date().toISOString().slice(0, 7),
        tithes: '',
        offerings: '',
        projects: '' 
      });
      
      window.location.reload();
      
    } catch (error) {
      console.error('Erro ao registrar doação:', error);
      toast.error('Erro ao registrar doação', {
        description: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  };

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const transactionData = {
        date: newTransaction.date,
        category: newTransaction.category,
        description: newTransaction.description,
        amount: parseFloat(newTransaction.amount) || 0,
        type: newTransaction.type,
        payment_method: newTransaction.payment_method || null,
        reference_number: newTransaction.reference_number || null,
        account_id: newTransaction.account_id || null
      };

      const { error } = await supabase
        .from('financial_transactions')
        .insert([transactionData]);
      
      if (error) throw error;
      
      toast.success('Transação registrada com sucesso!');
      setIsTransactionDialogOpen(false);
      setNewTransaction({
        date: new Date().toISOString().slice(0, 10),
        category: '',
        description: '',
        amount: '',
        type: 'income',
        payment_method: '',
        reference_number: '',
        account_id: ''
      });
      
      window.location.reload();
      
    } catch (error) {
      console.error('Erro ao registrar transação:', error);
      toast.error('Erro ao registrar transação', {
        description: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatMonthYear = (month: string) => {
    if (!month) return '';
    const [year, monthNum] = month.split('-');
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 
      'Maio', 'Junho', 'Julho', 'Agosto', 
      'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return `${monthNames[parseInt(monthNum) - 1]} de ${year}`;
  };

  // Função para obter o nome da conta pelo ID
  const getAccountName = (accountId: string | null) => {
    if (!accountId) return '-';
    const account = accounts.find(a => a.id === accountId);
    return account ? `${account.code} - ${account.name}` : '-';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Finanças</h1>
            <p className="text-muted-foreground">
              Gerencie as finanças da sua igreja.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog open={isDonationDialogOpen} onOpenChange={setIsDonationDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nova Doação
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleCreateDonation}>
                  <DialogHeader>
                    <DialogTitle>Registrar Nova Doação</DialogTitle>
                    <DialogDescription>
                      Preencha os valores das doações recebidas no mês.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="month">Mês/Ano</Label>
                      <Input 
                        id="month" 
                        type="month" 
                        value={newDonation.month}
                        onChange={(e) => setNewDonation({...newDonation, month: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tithes">Dízimos (R$)</Label>
                      <Input 
                        id="tithes" 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        placeholder="0.00" 
                        value={newDonation.tithes}
                        onChange={(e) => setNewDonation({...newDonation, tithes: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="offerings">Ofertas (R$)</Label>
                      <Input 
                        id="offerings" 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        placeholder="0.00" 
                        value={newDonation.offerings}
                        onChange={(e) => setNewDonation({...newDonation, offerings: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="projects">Projetos (R$)</Label>
                      <Input 
                        id="projects" 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        placeholder="0.00" 
                        value={newDonation.projects}
                        onChange={(e) => setNewDonation({...newDonation, projects: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      Registrar
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Nova Transação
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleCreateTransaction}>
                  <DialogHeader>
                    <DialogTitle>Registrar Nova Transação</DialogTitle>
                    <DialogDescription>
                      Preencha os detalhes da transação financeira.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="date">Data</Label>
                        <Input 
                          id="date" 
                          type="date" 
                          value={newTransaction.date}
                          onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="type">Tipo</Label>
                        <Select 
                          value={newTransaction.type} 
                          onValueChange={(value) => setNewTransaction({...newTransaction, type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="income">Receita</SelectItem>
                            <SelectItem value="expense">Despesa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="account_id">Conta</Label>
                      <Select 
                        value={newTransaction.account_id} 
                        onValueChange={(value) => setNewTransaction({...newTransaction, account_id: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma conta" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map(account => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.code} - {account.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Input 
                        id="category" 
                        placeholder="Ex: Aluguel, Salários, Manutenção..." 
                        value={newTransaction.category}
                        onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Valor (R$)</Label>
                      <Input 
                        id="amount" 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        placeholder="0.00" 
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Input 
                        id="description" 
                        placeholder="Descrição da transação" 
                        value={newTransaction.description}
                        onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="payment_method">Método de Pagamento</Label>
                        <Input 
                          id="payment_method" 
                          placeholder="Ex: Dinheiro, Cartão, PIX..." 
                          value={newTransaction.payment_method}
                          onChange={(e) => setNewTransaction({...newTransaction, payment_method: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="reference_number">Número de Referência</Label>
                        <Input 
                          id="reference_number" 
                          placeholder="Ex: Número da nota fiscal" 
                          value={newTransaction.reference_number}
                          onChange={(e) => setNewTransaction({...newTransaction, reference_number: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      Registrar
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
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

        {/* Tabs de Conteúdo */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="donations">Doações</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="accounts">Plano de Contas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-6">
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
                  ) : transactions.length > 0 ? (
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
          </TabsContent>
          
          <TabsContent value="donations" className="space-y-4 mt-6">
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
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4 mt-6">
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
          </TabsContent>

          <TabsContent value="accounts" className="space-y-4 mt-6">
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
                    <FileChart className="h-8 w-8 text-muted-foreground" />
                    <p>Nenhuma conta registrada no plano de contas</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Finance;
