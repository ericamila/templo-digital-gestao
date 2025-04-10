
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';
import { SchoolClass, Member } from '@/types/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen, Users, Calendar, PlusCircle, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const School = () => {
  const [activeTab, setActiveTab] = useState("classes");
  const { data: classes, isLoading: classesLoading } = useSupabaseFetch<SchoolClass>({
    table: 'school_classes',
    order: { column: 'name', ascending: true }
  });

  const { data: teachers } = useSupabaseFetch<Member>({
    table: 'members',
    column: 'member_type',
    value: 'teacher'
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Escola Dominical</h1>
            <p className="text-muted-foreground">
              Gerencie classes, alunos e professores da escola dominical.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nova Classe
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Nova Classe</DialogTitle>
                  <DialogDescription>
                    Preencha as informações para criar uma nova classe na escola dominical.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome da Classe</Label>
                    <Input id="name" placeholder="Nome da classe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea id="description" placeholder="Descrição da classe" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="teacher">Professor</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um professor" />
                        </SelectTrigger>
                        <SelectContent>
                          {teachers && teachers.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.id}>
                              {teacher.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="room">Sala</Label>
                      <Input id="room" placeholder="Ex: Sala 101" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => toast.success('Classe criada com sucesso!')}
                  >
                    Salvar Classe
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {classesLoading ? "..." : classes.length}
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
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground">
                Alunos matriculados
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Presença Média</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                Nos últimos 3 meses
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="students">Alunos</TabsTrigger>
            <TabsTrigger value="attendance">Presenças</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classes" className="space-y-4 mt-6">
            {classesLoading ? (
              <div className="flex items-center justify-center p-8">
                <p>Carregando classes...</p>
              </div>
            ) : classes && classes.length > 0 ? (
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
                          <span className="font-medium">{schoolClass.teacher_id ? "Professor Designado" : "Não designado"}</span>
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
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center space-y-3 p-6">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                  <p>Nenhuma classe encontrada</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Criar Primeira Classe
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Criar Nova Classe</DialogTitle>
                        <DialogDescription>
                          Preencha as informações para criar uma nova classe na escola dominical.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Nome da Classe</Label>
                          <Input id="name" placeholder="Nome da classe" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Descrição</Label>
                          <Textarea id="description" placeholder="Descrição da classe" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="teacher">Professor</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um professor" />
                              </SelectTrigger>
                              <SelectContent>
                                {teachers && teachers.map((teacher) => (
                                  <SelectItem key={teacher.id} value={teacher.id}>
                                    {teacher.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="room">Sala</Label>
                            <Input id="room" placeholder="Ex: Sala 101" />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => toast.success('Classe criada com sucesso!')}
                        >
                          Salvar Classe
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="students" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Alunos</CardTitle>
                <CardDescription>
                  Gerenciamento de alunos matriculados na escola dominical.
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                    <TableRow>
                      <TableCell className="font-medium">Ana Silva</TableCell>
                      <TableCell>Classe Infantil</TableCell>
                      <TableCell>10/03/2023</TableCell>
                      <TableCell>87%</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Detalhes</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">João Santos</TableCell>
                      <TableCell>Classe Juvenil</TableCell>
                      <TableCell>05/02/2023</TableCell>
                      <TableCell>92%</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Detalhes</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attendance" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Registro de Presenças</CardTitle>
                <CardDescription>
                  Faça o registro de presença dos alunos nas aulas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="class-select">Classe</Label>
                      <Select>
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
                      <Input id="date" type="date" />
                    </div>
                    <div className="flex items-end">
                      <Button>Carregar Lista</Button>
                    </div>
                  </div>
                  
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
                          <TableRow>
                            <TableCell className="font-medium">Ana Silva</TableCell>
                            <TableCell className="text-center">
                              <input type="checkbox" className="h-4 w-4" />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">João Santos</TableCell>
                            <TableCell className="text-center">
                              <input type="checkbox" className="h-4 w-4" />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="border-t p-4 flex justify-end">
                      <Button onClick={() => toast.success('Presenças registradas com sucesso!')}>
                        Salvar Presenças
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default School;
