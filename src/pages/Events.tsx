
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';
import { Event } from '@/types/supabase';
import { format, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : dateString;
  } catch (e) {
    return dateString;
  }
};

const Events = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'service'
  });

  const { data: events, isLoading } = useSupabaseFetch<Event>({
    table: 'events',
    order: { column: 'date', ascending: true }
  });

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const eventData = {
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        type: newEvent.type,
      };

      const { error } = await supabase
        .from('events')
        .insert([eventData]);
      
      if (error) throw error;
      
      toast.success('Evento criado com sucesso!');
      setIsDialogOpen(false);
      setNewEvent({ title: '', date: '', time: '', type: 'service' });
      
      // Recarregar a página para atualizar os dados
      window.location.reload();
      
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      toast.error('Erro ao criar evento', {
        description: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  };

  // Função para determinar o estilo do card com base no tipo de evento
  const getCardStyle = (type: string | null) => {
    switch (type) {
      case 'service':
        return 'border-l-4 border-l-blue-500';
      case 'meeting':
        return 'border-l-4 border-l-green-500';
      case 'celebration':
        return 'border-l-4 border-l-purple-500';
      default:
        return 'border-l-4 border-l-gray-500';
    }
  };

  // Função para obter o rótulo do tipo de evento
  const getEventTypeLabel = (type: string | null) => {
    switch (type) {
      case 'service':
        return 'Culto';
      case 'meeting':
        return 'Reunião';
      case 'celebration':
        return 'Celebração';
      default:
        return 'Outro';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Eventos</h1>
            <p className="text-muted-foreground">
              Gerencie os eventos da sua igreja.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreateEvent}>
                <DialogHeader>
                  <DialogTitle>Criar Novo Evento</DialogTitle>
                  <DialogDescription>
                    Preencha as informações para criar um novo evento.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Título</Label>
                    <Input 
                      id="title" 
                      placeholder="Título do evento" 
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">Data</Label>
                      <Input 
                        id="date" 
                        type="date" 
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">Horário</Label>
                      <Input 
                        id="time" 
                        placeholder="Ex: 19:00" 
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Tipo de Evento</Label>
                    <Select 
                      value={newEvent.type} 
                      onValueChange={(value) => setNewEvent({...newEvent, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="service">Culto</SelectItem>
                        <SelectItem value="meeting">Reunião</SelectItem>
                        <SelectItem value="celebration">Celebração</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    Criar Evento
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Calendário e Lista de Eventos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna do Calendário (Placeholder) */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Calendário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-80 border rounded-md bg-muted/20">
                  <p className="text-muted-foreground">Calendário em desenvolvimento...</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Eventos */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center h-40">
                    <p>Carregando eventos...</p>
                  </div>
                ) : events && events.length > 0 ? (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <Card key={event.id} className={getCardStyle(event.type)}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="space-y-1">
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <span>{formatDate(event.date)}</span>
                                {event.time && (
                                  <>
                                    <span>•</span>
                                    <span>{event.time}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <span className="text-sm inline-block px-2 py-1 rounded-full bg-muted">
                                {getEventTypeLabel(event.type)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40">
                    <p>Nenhum evento encontrado. Crie seu primeiro evento!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Events;
