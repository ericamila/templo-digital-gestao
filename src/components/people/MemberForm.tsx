
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Member } from '@/types/supabase';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface MemberFormProps {
  member?: Member;
  onClose: () => void;
  onSuccess: () => void;
}

const memberSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  email: z.string().email({ message: 'Email inválido' }).optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  member_type: z.string().min(1, { message: 'Tipo de membro é obrigatório' }),
  join_date: z.string().optional().or(z.literal('')),
});

const MemberForm: React.FC<MemberFormProps> = ({ member, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: member?.name || '',
      email: member?.email || '',
      phone: member?.phone || '',
      address: member?.address || '',
      member_type: member?.member_type || 'member',
      join_date: member?.join_date || new Date().toISOString().slice(0, 10),
    },
  });

  const handleSubmit = async (values: z.infer<typeof memberSchema>) => {
    try {
      setIsSubmitting(true);
      
      if (member) {
        // Update existing member - fix: pass values directly, not as array
        const { error } = await supabase
          .from('members')
          .update(values)
          .eq('id', member.id);
          
        if (error) throw error;
        
        toast.success('Membro atualizado com sucesso!');
      } else {
        // Create new member - fix: pass values directly, not as array
        const { error } = await supabase
          .from('members')
          .insert(values);
          
        if (error) throw error;
        
        toast.success('Membro criado com sucesso!');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar membro:', error);
      toast.error('Erro ao salvar membro', {
        description: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome*</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nome completo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="email@exemplo.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input {...field} placeholder="(00) 00000-0000" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Endereço completo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="member_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Membro*</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pastor">Pastor</SelectItem>
                  <SelectItem value="leader">Líder</SelectItem>
                  <SelectItem value="member">Membro</SelectItem>
                  <SelectItem value="visitor">Visitante</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="join_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Ingresso</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : member ? 'Atualizar' : 'Criar'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MemberForm;
