
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Calendar } from 'lucide-react';

interface StatCardsProps {
  classCount: number;
  studentCount: number;
  teacherCount: number;
  classesLoading: boolean;
  studentsLoading: boolean;
}

const StatCards = ({ classCount, studentCount, teacherCount, classesLoading, studentsLoading }: StatCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Classes</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {classesLoading ? "..." : classCount}
          </div>
          <p className="text-xs text-muted-foreground">
            Classes ativas na escola dominical
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{studentsLoading ? "..." : studentCount}</div>
          <p className="text-xs text-muted-foreground">
            Alunos matriculados
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Professores</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{teacherCount}</div>
          <p className="text-xs text-muted-foreground">
            Professores cadastrados
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
