
import { useState } from 'react';
import { Member, Student, SchoolClass } from '@/types/supabase';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AttendanceFormProps {
  students: Student[];
  members: Member[];
  classes: SchoolClass[];
}

const AttendanceForm = ({ students, members, classes }: AttendanceFormProps) => {
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isAttendanceClassSelected, setIsAttendanceClassSelected] = useState(false);
  
  const handleLoadAttendanceList = () => {
    if (selectedClassId && selectedDate) {
      setIsAttendanceClassSelected(true);
      toast.success('Lista de presença carregada');
    } else {
      toast.error('Selecione uma classe e data válida');
    }
  };

  const handleSaveAttendance = () => {
    toast.success('Presenças registradas com sucesso!');
    setIsAttendanceClassSelected(false);
    setSelectedClassId("");
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="class-select">Classe</Label>
          <Select 
            value={selectedClassId} 
            onValueChange={setSelectedClassId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma classe" />
            </SelectTrigger>
            <SelectContent>
              {classes && classes.map((schoolClass) => (
                <SelectItem key={schoolClass.id} value={schoolClass.id}>
                  {schoolClass.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="date">Data</Label>
          <Input 
            id="date" 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={handleLoadAttendanceList}>Carregar Lista</Button>
        </div>
      </div>
      
      {isAttendanceClassSelected && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Aluno</TableHead>
                  <TableHead className="w-[100px] text-center">Presente</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students && students
                  .filter(student => student.class_id === selectedClassId)
                  .map((student) => {
                    const member = members?.find(m => m.id === student.member_id);
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          {member?.name || "Membro não encontrado"}
                        </TableCell>
                        <TableCell className="text-center">
                          <input type="checkbox" className="h-4 w-4" />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t p-4 flex justify-end">
            <Button onClick={handleSaveAttendance}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Salvar Presenças
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AttendanceForm;
