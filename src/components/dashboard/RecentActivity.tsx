import { Activity, User, DollarSign, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';
import { Activity as ActivityType } from '@/types/supabase';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ActivityIcon = ({ type }: { type: string }) => {
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

const getIconColor = (type: string) => {
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

const formatTimeAgo = (timestamp: string) => {
  try {
    return formatDistanceToNow(parseISO(timestamp), { 
      addSuffix: true,
      locale: ptBR 
    });
  } catch (e) {
    return timestamp;
  }
};

const RecentActivity = () => {
  const { data, isLoading } = useSupabaseFetch<ActivityType>({
    table: 'activities',
    order: { column: 'timestamp', ascending: false },
    limit: 5
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Carregando atividades...</p>
          </div>
        ) : (
          <div className="space-y-0">
            {data.map((activity) => (
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
                  {formatTimeAgo(activity.timestamp)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
