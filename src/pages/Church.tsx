
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Users, Calendar, Clock, Plus } from 'lucide-react';
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';
import { Database } from '@/integrations/supabase/types';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Church = Database['public']['Tables']['churches']['Row'];

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
  const { data: churches, isLoading } = useSupabaseFetch<Church>({
    table: 'churches',
    order: { column: 'name', ascending: true }
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Igrejas</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nova Igreja
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Carregando igrejas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {churches.map((church) => (
              <Card key={church.id} className="overflow-hidden">
                <div className={`h-36 ${getCardColorClass(church.type)} flex items-center justify-center`}>
                  <h3 className={`text-2xl font-bold ${getTitleColorClass(church.type)}`}>
                    {church.type === 'sede' ? 'Igreja Sede' : 'Filial'}
                  </h3>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{church.name}</CardTitle>
                  <CardDescription>{church.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{church.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{church.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{church.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Fundada em {formatDate(church.founded_date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{church.schedule}</span>
                    </div>
                    <div className="pt-4">
                      <Button variant="outline" size="sm" className="w-full">Ver detalhes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Church;
