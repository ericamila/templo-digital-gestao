
import { Activity, User, DollarSign, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityItem {
  id: string;
  type: 'member' | 'donation' | 'event' | 'other';
  title: string;
  description: string;
  timestamp: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'member',
    title: 'Novo membro registrado',
    description: 'Maria Silva completou seu cadastro',
    timestamp: '10 minutos atrás'
  },
  {
    id: '2',
    type: 'donation',
    title: 'Doação recebida',
    description: 'R$500,00 - Dízimo mensal',
    timestamp: '1 hora atrás'
  },
  {
    id: '3',
    type: 'event',
    title: 'Evento criado',
    description: 'Retiro de jovens - 15/05/2023',
    timestamp: '3 horas atrás'
  },
  {
    id: '4',
    type: 'member',
    title: 'Aniversário',
    description: 'João Santos faz aniversário hoje',
    timestamp: 'Hoje'
  },
  {
    id: '5',
    type: 'event',
    title: 'Evento atualizado',
    description: 'Culto de domingo - Mudança de horário para 19h',
    timestamp: '5 horas atrás'
  }
];

const ActivityIcon = ({ type }: { type: ActivityItem['type'] }) => {
  switch (type) {
    case 'member':
      return <User className="h-4 w-4" />;
    case 'donation':
      return <DollarSign className="h-4 w-4" />;
    case 'event':
      return <Calendar className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

const getIconColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'member':
      return 'bg-blue-100 text-blue-600';
    case 'donation':
      return 'bg-green-100 text-green-600';
    case 'event':
      return 'bg-purple-100 text-church-purple';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const RecentActivity = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {mockActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors"
            >
              <div className={cn("p-2 rounded-full mr-3", getIconColor(activity.type))}>
                <ActivityIcon type={activity.type} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.timestamp}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
