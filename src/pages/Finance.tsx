
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';
import { Donation, FinancialTransaction, Account, AccountCategory } from '@/types/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import shared utils and components
import { formatCurrency, formatMonthYear } from '@/components/finance/FormatterUtils';
import { FinanceHeader } from '@/components/finance/FinanceHeader';
import { StatsCards } from '@/components/finance/StatsCards';
import { OverviewTab } from '@/components/finance/OverviewTab';
import { DonationsTab } from '@/components/finance/DonationsTab';
import { TransactionsTab } from '@/components/finance/TransactionsTab';
import { AccountsTab } from '@/components/finance/AccountsTab';
import { DonationDialog } from '@/components/finance/DonationDialog';
import { TransactionDialog } from '@/components/finance/TransactionDialog';

const Finance = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);

  // Fetch donations
  const { data: donations, isLoading: donationsLoading } = useSupabaseFetch<Donation>({
    table: 'donations',
    order: { column: 'month', ascending: false }
  });

  // Fetch financial transactions
  const { data: transactions, isLoading: transactionsLoading } = useSupabaseFetch<FinancialTransaction>({
    table: 'financial_transactions',
    order: { column: 'date', ascending: false }
  });

  // Fetch account categories
  const { data: accountCategories, isLoading: categoriesLoading } = useSupabaseFetch<AccountCategory>({
    table: 'account_categories',
    order: { column: 'name', ascending: true }
  });

  // Fetch accounts
  const { data: accounts, isLoading: accountsLoading } = useSupabaseFetch<Account>({
    table: 'accounts',
    order: { column: 'code', ascending: true }
  });

  // Process transactions to get totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const balance = totalIncome - totalExpense;

  // Function to get account name by ID
  const getAccountName = (accountId: string | null) => {
    if (!accountId) return '-';
    const account = accounts.find(a => a.id === accountId);
    return account ? `${account.code} - ${account.name}` : '-';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <FinanceHeader 
          setIsDonationDialogOpen={setIsDonationDialogOpen} 
          setIsTransactionDialogOpen={setIsTransactionDialogOpen} 
        />

        {/* Stats Cards */}
        <StatsCards
          balance={balance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          formatCurrency={formatCurrency}
        />

        {/* Tabs de Conteúdo */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="donations">Doações</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="accounts">Plano de Contas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-6">
            <OverviewTab 
              donationsLoading={donationsLoading}
              transactionsLoading={transactionsLoading}
              donations={donations}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              formatCurrency={formatCurrency}
            />
          </TabsContent>
          
          <TabsContent value="donations" className="space-y-4 mt-6">
            <DonationsTab 
              donations={donations}
              donationsLoading={donationsLoading}
              setIsDonationDialogOpen={setIsDonationDialogOpen}
              formatCurrency={formatCurrency}
              formatMonthYear={formatMonthYear}
            />
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4 mt-6">
            <TransactionsTab 
              transactions={transactions}
              transactionsLoading={transactionsLoading}
              setIsTransactionDialogOpen={setIsTransactionDialogOpen}
              formatCurrency={formatCurrency}
              getAccountName={getAccountName}
            />
          </TabsContent>

          <TabsContent value="accounts" className="space-y-4 mt-6">
            <AccountsTab 
              accountCategories={accountCategories}
              accounts={accounts}
              categoriesLoading={categoriesLoading}
              accountsLoading={accountsLoading}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <DonationDialog 
        open={isDonationDialogOpen} 
        onOpenChange={setIsDonationDialogOpen} 
      />
      
      <TransactionDialog 
        open={isTransactionDialogOpen} 
        onOpenChange={setIsTransactionDialogOpen} 
        accounts={accounts}
      />
    </MainLayout>
  );
};

export default Finance;
