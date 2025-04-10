
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'default' | 'purple' | 'gold' | 'blue' | 'green' | 'red';
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend, 
  color = 'default' 
}: StatCardProps) => {
  const borderColors = {
    default: 'border-l-gray-400',
    purple: 'border-l-church-purple',
    gold: 'border-l-church-gold',
    blue: 'border-l-blue-500',
    green: 'border-l-green-500',
    red: 'border-l-red-500'
  };

  const iconColors = {
    default: 'bg-gray-100 text-gray-600',
    purple: 'bg-purple-100 text-church-purple',
    gold: 'bg-yellow-100 text-church-gold',
    blue: 'bg-blue-100 text-blue-500',
    green: 'bg-green-100 text-green-500',
    red: 'bg-red-100 text-red-500'
  };

  return (
    <Card className={cn("border-l-4", borderColors[color])}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
            {trend && (
              <div className="flex items-center mt-1">
                <span className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}>
                  {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs. last month</span>
              </div>
            )}
          </div>
          <div className={cn("p-2 rounded-full", iconColors[color])}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
