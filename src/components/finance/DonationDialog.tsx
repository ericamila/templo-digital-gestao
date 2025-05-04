
import { useState } from 'react';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DonationDialog({ open, onOpenChange }: DonationDialogProps) {
  const [newDonation, setNewDonation] = useState({
    month: new Date().toISOString().slice(0, 7), // YYYY-MM
    tithes: '',
    offerings: '',
    projects: ''
  });

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
        .insert(donationData);
      
      if (error) throw error;
      
      toast.success('Doação registrada com sucesso!');
      onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
}
