
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Search, MoreVertical, Filter, Trash } from 'lucide-react';
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';
import { Member } from '@/types/supabase';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import MemberForm from '@/components/people/MemberForm';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const getBadgeVariant = (memberType: string) => {
  switch (memberType) {
    case 'pastor':
      return 'default';
    case 'leader':
      return 'secondary';
    case 'member':
      return 'outline';
    case 'visitor':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getMemberTypeLabel = (memberType: string) => {
  switch (memberType) {
    case 'pastor':
      return 'Pastor';
    case 'leader':
      return 'Líder';
    case 'member':
      return 'Membro';
    case 'visitor':
      return 'Visitante';
    default:
      return memberType;
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return '';
  try {
    return format(parseISO(dateStr), 'dd/MM/yyyy', { locale: ptBR });
  } catch (e) {
    return dateStr;
  }
};

const People = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const { data: members, isLoading } = useSupabaseFetch<Member>({
    table: 'members',
    order: { column: 'name', ascending: true }
  });
  
  const filteredPeople = members.filter((person) => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (person.email && person.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (person.phone && person.phone.includes(searchTerm))
  );

  const handleOpenForm = (member?: Member) => {
    setSelectedMember(member);
    setIsFormOpen(true);
  };

  const handleOpenDeleteDialog = (member: Member) => {
    setSelectedMember(member);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteMember = async () => {
    if (!selectedMember) return;
    
    try {
      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', selectedMember.id);
        
      if (error) throw error;
      
      toast.success('Membro removido com sucesso!');
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Erro ao remover membro:', error);
      toast.error('Erro ao remover membro', {
        description: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedMember(undefined);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Pessoas</h1>
          <Button onClick={() => handleOpenForm()}>
            <Plus className="mr-2 h-4 w-4" /> Nova Pessoa
          </Button>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar pessoa..." 
              className="flex-1" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filtrar
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Carregando pessoas...</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Telefone</TableHead>
                  <TableHead className="hidden lg:table-cell">Endereço</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="hidden md:table-cell">Data de Ingresso</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPeople.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      {searchTerm ? 'Nenhuma pessoa encontrada com este termo' : 'Nenhuma pessoa cadastrada'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPeople.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg`} alt={person.name} />
                            <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{person.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{person.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{person.phone}</TableCell>
                      <TableCell className="hidden lg:table-cell max-w-xs truncate">
                        {person.address}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(person.member_type)}>
                          {getMemberTypeLabel(person.member_type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(person.join_date)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleOpenForm(person)}>
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleOpenDeleteDialog(person)}
                              className="text-destructive"
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedMember ? 'Editar Pessoa' : 'Nova Pessoa'}</DialogTitle>
          </DialogHeader>
          <MemberForm 
            member={selectedMember} 
            onClose={() => {
              setIsFormOpen(false);
              setSelectedMember(undefined);
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
              Esta ação não pode ser desfeita. Isso excluirá permanentemente {selectedMember?.name} do sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedMember(undefined)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMember} className="bg-destructive text-destructive-foreground">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default People;
