
import { SchoolClass, Member } from '@/types/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, PlusCircle, BookOpen } from 'lucide-react';

interface ClassListProps {
  classes: SchoolClass[];
  teachers: Member[];
  isLoading: boolean;
  onCreateClass: () => void;
}

const ClassList = ({ classes, teachers, isLoading, onCreateClass }: ClassListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p>Carregando classes...</p>
      </div>
    );
  }
  
  if (!classes || classes.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center space-y-3 p-6">
          <BookOpen className="h-8 w-8 text-muted-foreground" />
          <p>Nenhuma classe encontrada</p>
          <Button onClick={onCreateClass}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Primeira Classe
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {classes.map((schoolClass) => (
        <Card key={schoolClass.id}>
          <CardHeader>
            <CardTitle>{schoolClass.name}</CardTitle>
            <CardDescription>
              {schoolClass.description || "Sem descrição"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Professor:</span>
                <span className="font-medium">
                  {teachers && teachers.find(t => t.id === schoolClass.teacher_id)?.name || "Não designado"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Horário:</span>
                <span className="font-medium">{schoolClass.schedule || "Não definido"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sala:</span>
                <span className="font-medium">{schoolClass.room || "Não definida"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Alunos:</span>
                <span className="font-medium">
                  {schoolClass.current_students || 0}/{schoolClass.max_students || "-"}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full">
              Ver Detalhes
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ClassList;
