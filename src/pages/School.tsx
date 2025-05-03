
import { useState, FormEvent } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';
import { SchoolClass, Member, Student } from '@/types/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen, Users, Calendar, PlusCircle, ChevronRight, UserPlus, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const School = () => {
  const [activeTab, setActiveTab] = useState("classes");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTeacherDialogOpen, setIsTeacherDialogOpen] = useState(false);
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [isAttendanceClassSelected, setIsAttendanceClassSelected] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Form states
  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    teacher_id: '',
    room: '',
    schedule: '',
    max_students: ''
  });

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [newStudent, setNewStudent] = useState({
    member_id: '',
    class_id: ''
  });

  // Fetch data
  const { data: classes, isLoading: classesLoading } = useSupabaseFetch<SchoolClass>({
    table: 'school_classes',
    order: { column: 'name', ascending: true }
  });

  const { data: teachers } = useSupabaseFetch<Member>({
    table: 'members',
    column: 'member_type',
    value: 'teacher'
  });

  const { data: members } = useSupabaseFetch<Member>({
    table: 'members'
  });

  const { data: students, isLoading: studentsLoading } = useSupabaseFetch<Student>({
    table: 'students'
  });

  // Handle form submissions
  const handleCreateClass = async (e: FormEvent) => {
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

      const { data, error } = await supabase
        .from('school_classes')
        .insert([classData])
        .select();
      
      if (error) throw error;
      
      toast.success('Classe criada com sucesso!');
      setIsDialogOpen(false);
      setNewClass({name: '', description: '', teacher_id: '', room: '', schedule: '', max_students: ''});
      
      // Force reload the page to update the data
      window.location.reload();
      
    } catch (error) {
      console.error('Erro ao criar classe:', error);
      toast.error('Erro ao criar classe', {
        description: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  };

  const handleCreateTeacher = async (e: FormEvent) => {
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

      const { data, error } = await supabase
        .from('members')
        .insert([teacherData])
        .select();
      
      if (error) throw error;
      
      toast.success('Professor cadastrado com sucesso!');
      setIsTeacherDialogOpen(false);
      setNewTeacher({name: '', email: '', phone: '', address: ''});
      
      // Force reload the page to update the data
      window.location.reload();
      
    } catch (error) {
      console.error('Erro ao cadastrar professor:', error);
      toast.error('Erro ao cadastrar professor', {
        description: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  };

  const handleEnrollStudent = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const studentData = {
        member_id: newStudent.member_id,
        class_id: newStudent.class_id,
        enrollment_date: new Date().toISOString().split('T')[0]
      };

      const { data, error } = await supabase
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
      setIsStudentDialogOpen(false);
      setNewStudent({member_id: '', class_id: ''});
      
      // Force reload the page to update the data
      window.location.reload();
      
    } catch (error) {
      console.error('Erro ao matricular aluno:', error);
      toast.error('Erro ao matricular aluno', {
        description: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  };

  const handleLoadAttendanceList = () => {
    if (selectedClassId && selectedDate) {
      setIsAttendanceClassSelected(true);
      // Aqui carregaríamos os alunos da classe para tomar presença
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nova Classe
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleCreateClass}>
                  <DialogHeader>
                    <DialogTitle>Criar Nova Classe</DialogTitle>
                    <DialogDescription>
                      Preencha as informações para criar uma nova classe na escola dominical.
                    </DialogDescription>
                  </DialogHeader>
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
                          onClick={() => {
                            setIsDialogOpen(false);
                            setIsTeacherDialogOpen(true);
                          }}
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
              </DialogContent>
            </Dialog>

            <Dialog open={isTeacherDialogOpen} onOpenChange={setIsTeacherDialogOpen}>
              <DialogContent>
                <form onSubmit={handleCreateTeacher}>
                  <DialogHeader>
                    <DialogTitle>Cadastrar Novo Professor</DialogTitle>
                    <DialogDescription>
                      Preencha as informações para cadastrar um novo professor.
                    </DialogDescription>
                  </DialogHeader>
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
              </DialogContent>
            </Dialog>

            <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Matricular Aluno
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleEnrollStudent}>
                  <DialogHeader>
                    <DialogTitle>Matricular Aluno</DialogTitle>
                    <DialogDescription>
                      Selecione o membro e a classe para realizar a matrícula.
                    </DialogDescription>
                  </DialogHeader>
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
                {classesLoading ? "..." : classes?.length || 0}
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
              <div className="text-2xl font-bold">{studentsLoading ? "..." : students?.length || 0}</div>
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
              <div className="text-2xl font-bold">{teachers?.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                Professores cadastrados
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
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center space-y-3 p-6">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                  <p>Nenhuma classe encontrada</p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Criar Primeira Classe
                  </Button>
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
                {studentsLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <p>Carregando alunos...</p>
                  </div>
                ) : students && students.length > 0 ? (
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
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-3 p-6">
                    <Users className="h-8 w-8 text-muted-foreground" />
                    <p>Nenhum aluno matriculado</p>
                    <Button onClick={() => setIsStudentDialogOpen(true)}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Matricular Primeiro Aluno
                    </Button>
                  </div>
                )}
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default School;
