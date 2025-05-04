
import { useState } from 'react';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Account } from '@/types/supabase';

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accounts: Account[];
}

export function TransactionDialog({ open, onOpenChange, accounts }: TransactionDialogProps) {
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
        .insert(transactionData);
      
      if (error) throw error;
      
      toast.success('Transação registrada com sucesso!');
      onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
}
