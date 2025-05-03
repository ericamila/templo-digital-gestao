
import { Member, Student, SchoolClass } from '@/types/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, Users } from 'lucide-react';

interface StudentListProps {
  students: Student[];
  members: Member[];
  classes: SchoolClass[];
  isLoading: boolean;
  onEnrollStudent: () => void;
}

const StudentList = ({ students, members, classes, isLoading, onEnrollStudent }: StudentListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p>Carregando alunos...</p>
      </div>
    );
  }
  
  if (!students || students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 p-6">
        <Users className="h-8 w-8 text-muted-foreground" />
        <p>Nenhum aluno matriculado</p>
        <Button onClick={onEnrollStudent}>
          <UserPlus className="mr-2 h-4 w-4" />
          Matricular Primeiro Aluno
        </Button>
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Classe</TableHead>
          <TableHead>Data de Matrícula</TableHead>
          <TableHead>Frequência</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => {
          const member = members?.find(m => m.id === student.member_id);
          const schoolClass = classes?.find(c => c.id === student.class_id);
          
          return (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                {member?.name || "Membro não encontrado"}
              </TableCell>
              <TableCell>
                {schoolClass?.name || "Classe não encontrada"}
              </TableCell>
              <TableCell>
                {new Date(student.enrollment_date).toLocaleDateString('pt-BR')}
              </TableCell>
              <TableCell>
                {student.attendance_rate ? `${student.attendance_rate}%` : "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">Detalhes</Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default StudentList;
