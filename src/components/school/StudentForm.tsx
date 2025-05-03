
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SchoolClass, Member } from '@/types/supabase';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from '@/components/ui/dialog';

interface StudentFormProps {
  members: Member[];
  classes: SchoolClass[];
  onSuccess: () => void;
}

const StudentForm = ({ members, classes, onSuccess }: StudentFormProps) => {
  const [newStudent, setNewStudent] = useState({
    member_id: '',
    class_id: ''
  });

  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const studentData = {
        member_id: newStudent.member_id,
        class_id: newStudent.class_id,
        enrollment_date: new Date().toISOString().split('T')[0]
      };

      const { error } = await supabase
        .from('students')
        .insert([studentData])
        .select();
      
      if (error) throw error;

      // Update class current_students count
      const { error: updateError } = await supabase.rpc('increment_class_students', {
        class_id: newStudent.class_id
      });
      
      if (updateError) console.error('Erro ao atualizar contagem de alunos:', updateError);
      
      toast.success('Aluno matriculado com sucesso!');
      setNewStudent({member_id: '', class_id: ''});
      onSuccess();
      
    } catch (error) {
      console.error('Erro ao matricular aluno:', error);
      toast.error('Erro ao matricular aluno', {
        description: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  };

  return (
    <form onSubmit={handleEnrollStudent}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="member">Membro</Label>
          <Select 
            value={newStudent.member_id} 
            onValueChange={(value) => setNewStudent({...newStudent, member_id: value})}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um membro" />
            </SelectTrigger>
            <SelectContent>
              {members && members.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="class">Classe</Label>
          <Select 
            value={newStudent.class_id} 
            onValueChange={(value) => setNewStudent({...newStudent, class_id: value})}
            required
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
      </div>
      <DialogFooter>
        <Button type="submit">
          Confirmar Matrícula
        </Button>
      </DialogFooter>
    </form>
  );
};

export default StudentForm;
