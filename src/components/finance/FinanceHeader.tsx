
import { Button } from "@/components/ui/button";
import { PlusCircle, DollarSign } from "lucide-react";

interface FinanceHeaderProps {
  setIsDonationDialogOpen: (value: boolean) => void;
  setIsTransactionDialogOpen: (value: boolean) => void;
}

export function FinanceHeader({ setIsDonationDialogOpen, setIsTransactionDialogOpen }: FinanceHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Finanças</h1>
        <p className="text-muted-foreground">
          Gerencie as finanças da sua igreja.
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={() => setIsDonationDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Doação
        </Button>
        <Button variant="outline" onClick={() => setIsTransactionDialogOpen(true)}>
          <DollarSign className="mr-2 h-4 w-4" />
          Nova Transação
        </Button>
      </div>
    </div>
  );
}
