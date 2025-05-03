
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from '@/components/ui/dialog';

interface TeacherFormProps {
  onSuccess: () => void;
}

const TeacherForm = ({ onSuccess }: TeacherFormProps) => {
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const teacherData = {
        name: newTeacher.name,
        email: newTeacher.email,
        phone: newTeacher.phone,
        address: newTeacher.address,
        member_type: 'teacher',
        join_date: new Date().toISOString().split('T')[0]
      };

      const { error } = await supabase
        .from('members')
        .insert([teacherData])
        .select();
      
      if (error) throw error;
      
      toast.success('Professor cadastrado com sucesso!');
      setNewTeacher({name: '', email: '', phone: '', address: ''});
      onSuccess();
      
    } catch (error) {
      console.error('Erro ao cadastrar professor:', error);
      toast.error('Erro ao cadastrar professor', {
        description: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  };

  return (
    <form onSubmit={handleCreateTeacher}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="teacher_name">Nome</Label>
          <Input 
            id="teacher_name" 
            placeholder="Nome completo" 
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="teacher_email">Email</Label>
          <Input 
            id="teacher_email" 
            type="email" 
            placeholder="email@exemplo.com" 
            value={newTeacher.email}
            onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="teacher_phone">Telefone</Label>
            <Input 
              id="teacher_phone" 
              placeholder="(00) 00000-0000" 
              value={newTeacher.phone}
              onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="teacher_address">Endereço</Label>
            <Input 
              id="teacher_address" 
              placeholder="Endereço" 
              value={newTeacher.address}
              onChange={(e) => setNewTeacher({...newTeacher, address: e.target.value})}
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">
          Cadastrar Professor
        </Button>
      </DialogFooter>
    </form>
  );
};

export default TeacherForm;
