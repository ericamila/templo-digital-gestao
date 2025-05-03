
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Member } from '@/types/supabase';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from '@/components/ui/dialog';

interface ClassFormProps {
  teachers: Member[];
  onSuccess: () => void;
  onCreateTeacher: () => void;
}

const ClassForm = ({ teachers, onSuccess, onCreateTeacher }: ClassFormProps) => {
  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    teacher_id: '',
    room: '',
    schedule: '',
    max_students: ''
  });

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const classData = {
        name: newClass.name,
        description: newClass.description,
        teacher_id: newClass.teacher_id || null,
        room: newClass.room,
        schedule: newClass.schedule,
        max_students: newClass.max_students ? parseInt(newClass.max_students) : null,
        current_students: 0
      };

      const { error } = await supabase
        .from('school_classes')
        .insert([classData])
        .select();
      
      if (error) throw error;
      
      toast.success('Classe criada com sucesso!');
      setNewClass({name: '', description: '', teacher_id: '', room: '', schedule: '', max_students: ''});
      onSuccess();
      
    } catch (error) {
      console.error('Erro ao criar classe:', error);
      toast.error('Erro ao criar classe', {
        description: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  };

  return (
    <form onSubmit={handleCreateClass}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome da Classe</Label>
          <Input 
            id="name" 
            placeholder="Nome da classe" 
            value={newClass.name}
            onChange={(e) => setNewClass({...newClass, name: e.target.value})}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea 
            id="description" 
            placeholder="Descrição da classe" 
            value={newClass.description}
            onChange={(e) => setNewClass({...newClass, description: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="teacher">Professor</Label>
            <Select 
              value={newClass.teacher_id} 
              onValueChange={(value) => setNewClass({...newClass, teacher_id: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um professor" />
              </SelectTrigger>
              <SelectContent>
                {teachers && teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-teachers" disabled>
                    Nenhum professor cadastrado
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <Button 
              type="button" 
              variant="link" 
              className="mt-1 px-0"
              onClick={onCreateTeacher}
            >
              Cadastrar novo professor
            </Button>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="room">Sala</Label>
            <Input 
              id="room" 
              placeholder="Ex: Sala 101" 
              value={newClass.room}
              onChange={(e) => setNewClass({...newClass, room: e.target.value})}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="schedule">Horário</Label>
            <Input 
              id="schedule" 
              placeholder="Ex: Domingo, 9:00" 
              value={newClass.schedule}
              onChange={(e) => setNewClass({...newClass, schedule: e.target.value})}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="max_students">Máximo de Alunos</Label>
            <Input 
              id="max_students" 
              type="number" 
              placeholder="Ex: 20" 
              value={newClass.max_students}
              onChange={(e) => setNewClass({...newClass, max_students: e.target.value})}
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">
          Salvar Classe
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ClassForm;
