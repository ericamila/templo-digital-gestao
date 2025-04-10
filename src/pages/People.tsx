
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Search, MoreVertical, Filter } from 'lucide-react';
import { useState } from 'react';

interface Person {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  memberType: 'member' | 'visitor' | 'leader' | 'pastor';
  joinDate: string;
}

const mockPeople: Person[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123, São Paulo - SP',
    memberType: 'pastor',
    joinDate: '10/05/2010',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(11) 91234-5678',
    address: 'Av. Paulista, 1000, São Paulo - SP',
    memberType: 'leader',
    joinDate: '15/03/2012',
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@email.com',
    phone: '(11) 99876-5432',
    address: 'Rua Augusta, 500, São Paulo - SP',
    memberType: 'member',
    joinDate: '20/07/2015',
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '(11) 95555-4444',
    address: 'Rua Oscar Freire, 200, São Paulo - SP',
    memberType: 'member',
    joinDate: '05/01/2018',
  },
  {
    id: '5',
    name: 'Lucas Ferreira',
    email: 'lucas.ferreira@email.com',
    phone: '(11) 94444-3333',
    address: 'Rua Consolação, 150, São Paulo - SP',
    memberType: 'visitor',
    joinDate: '12/04/2023',
  },
];

const getBadgeVariant = (memberType: Person['memberType']) => {
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

const getMemberTypeLabel = (memberType: Person['memberType']) => {
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

const People = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPeople = mockPeople.filter((person) => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.phone.includes(searchTerm)
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Pessoas</h1>
          <Button>
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
              {filteredPeople.map((person) => (
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
                    <Badge variant={getBadgeVariant(person.memberType)}>
                      {getMemberTypeLabel(person.memberType)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{person.joinDate}</TableCell>
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
                        <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default People;
