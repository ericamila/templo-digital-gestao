
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'service' | 'meeting' | 'celebration' | 'other';
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Culto de Domingo',
    date: '12/05/2023',
    time: '10:00 - 12:00',
    type: 'service'
  },
  {
    id: '2',
    title: 'Reunião de Liderança',
    date: '13/05/2023',
    time: '19:00 - 21:00',
    type: 'meeting'
  },
  {
    id: '3',
    title: 'Escola Dominical',
    date: '12/05/2023',
    time: '09:00 - 10:00',
    type: 'service'
  },
  {
    id: '4',
    title: 'Aniversário da Igreja',
    date: '15/05/2023',
    time: '19:00 - 22:00',
    type: 'celebration'
  }
];

const getBadgeVariant = (type: Event['type']) => {
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

const UpcomingEvents = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-church-purple" />
          Próximos Eventos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockEvents.map((event) => (
            <div key={event.id} className="flex flex-col space-y-1">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{event.title}</h4>
                <Badge variant={getBadgeVariant(event.type)}>
                  {event.type === 'service' && 'Culto'}
                  {event.type === 'meeting' && 'Reunião'}
                  {event.type === 'celebration' && 'Celebração'}
                  {event.type === 'other' && 'Outro'}
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
