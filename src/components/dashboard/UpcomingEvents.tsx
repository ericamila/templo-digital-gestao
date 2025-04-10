import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';
import { Event } from '@/types/supabase';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FormattedEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'service' | 'meeting' | 'celebration' | 'other';
}

const getBadgeVariant = (type: string | null) => {
  switch (type) {
    case 'service':
      return 'default';
    case 'meeting':
      return 'outline';
    case 'celebration':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getTypeLabel = (type: string | null) => {
  switch (type) {
    case 'service':
      return 'Culto';
    case 'meeting':
      return 'Reunião';
    case 'celebration':
      return 'Celebração';
    default:
      return 'Outro';
  }
};

const formatDate = (dateStr: string) => {
  try {
    return format(parseISO(dateStr), 'dd/MM/yyyy', { locale: ptBR });
  } catch (e) {
    return dateStr;
  }
};

const UpcomingEvents = () => {
  const { data, isLoading } = useSupabaseFetch<Event>({
    table: 'events',
    order: { column: 'date', ascending: true },
    limit: 4
  });

  const formattedEvents: FormattedEvent[] = data.map(event => ({
    id: event.id,
    title: event.title,
    date: formatDate(event.date),
    time: event.time || '',
    type: (event.type as 'service' | 'meeting' | 'celebration' | 'other') || 'other'
  }));

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-church-purple" />
          Próximos Eventos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Carregando eventos...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {formattedEvents.map((event) => (
              <div key={event.id} className="flex flex-col space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{event.title}</h4>
                  <Badge variant={getBadgeVariant(event.type)}>
                    {getTypeLabel(event.type)}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{event.date}</span>
                  <span>•</span>
                  <span>{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 text-center">
          <a href="/events" className="text-xs text-primary hover:underline font-medium">
            Ver todos os eventos →
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
