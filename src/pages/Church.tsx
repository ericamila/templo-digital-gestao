
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Users, Calendar, Clock, Plus, Trash, Edit } from 'lucide-react';
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';
import { Church as ChurchType } from '@/types/supabase';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ChurchForm from '@/components/church/ChurchForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const getCardColorClass = (type: string | null) => {
  switch (type) {
    case 'sede':
      return 'bg-church-purple/20';
    case 'filial':
      return 'bg-church-gold/20';
    default:
      return 'bg-blue-500/20';
  }
};

const getTitleColorClass = (type: string | null) => {
  switch (type) {
    case 'sede':
      return 'text-church-purple';
    case 'filial':
      return 'text-church-gold';
    default:
      return 'text-blue-500';
  }
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return '';
  try {
    return format(parseISO(dateStr), 'dd/MM/yyyy', { locale: ptBR });
  } catch (e) {
    return dateStr;
  }
};

const Church = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedChurch, setSelectedChurch] = useState<ChurchType | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const { data: churches, isLoading } = useSupabaseFetch<ChurchType>({
    table: 'churches',
    order: { column: 'name', ascending: true }
  });

  const handleOpenForm = (church?: ChurchType) => {
    setSelectedChurch(church);
    setIsFormOpen(true);
  };

  const handleOpenDeleteDialog = (church: ChurchType) => {
    setSelectedChurch(church);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteChurch = async () => {
    if (!selectedChurch) return;
    
    try {
      const { error } = await supabase
        .from('churches')
        .delete()
        .eq('id', selectedChurch.id);
        
      if (error) throw error;
      
      toast.success('Igreja removida com sucesso!');
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Erro ao remover igreja:', error);
      toast.error('Erro ao remover igreja', {
        description: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedChurch(undefined);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Igrejas</h1>
          <Button onClick={() => handleOpenForm()}>
            <Plus className="mr-2 h-4 w-4" /> Nova Igreja
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Carregando igrejas...</p>
          </div>
        ) : churches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 bg-muted/30 rounded-lg border border-dashed">
            <p className="text-muted-foreground mb-4">Nenhuma igreja cadastrada</p>
            <Button onClick={() => handleOpenForm()}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar igreja
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {churches.map((church) => (
              <Card key={church.id} className="overflow-hidden">
                <div className={`h-36 ${getCardColorClass(church.type)} flex items-center justify-center relative`}>
                  <h3 className={`text-2xl font-bold ${getTitleColorClass(church.type)}`}>
                    {church.type === 'sede' ? 'Igreja Sede' : 'Filial'}
                  </h3>
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-background/50 hover:bg-background/80">
                          <span className="sr-only">Ações</span>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleOpenForm(church)}>
                          <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleOpenDeleteDialog(church)}
                          className="text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" /> Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{church.name}</CardTitle>
                  <CardDescription>{church.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {church.address && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{church.address}</span>
                      </div>
                    )}
                    {church.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{church.phone}</span>
                      </div>
                    )}
                    {church.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{church.email}</span>
                      </div>
                    )}
                    {church.founded_date && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Fundada em {formatDate(church.founded_date)}</span>
                      </div>
                    )}
                    {church.schedule && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{church.schedule}</span>
                      </div>
                    )}
                    <div className="pt-4">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => handleOpenForm(church)}>
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedChurch ? 'Editar Igreja' : 'Nova Igreja'}</DialogTitle>
          </DialogHeader>
          <ChurchForm 
            church={selectedChurch} 
            onClose={() => {
              setIsFormOpen(false);
              setSelectedChurch(undefined);
            }}
            onSuccess={() => {
              setRefreshTrigger(prev => prev + 1);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a igreja {selectedChurch?.name} do sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedChurch(undefined)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteChurch} className="bg-destructive text-destructive-foreground">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default Church;
