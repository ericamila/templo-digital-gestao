
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';
import { SchoolClass, Member, Student } from '@/types/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, UserPlus } from 'lucide-react';

// Importar componentes refatorados
import StatCards from '@/components/school/StatCards';
import ClassForm from '@/components/school/ClassForm';
import TeacherForm from '@/components/school/TeacherForm';
import StudentForm from '@/components/school/StudentForm';
import ClassList from '@/components/school/ClassList';
import StudentList from '@/components/school/StudentList';
import AttendanceForm from '@/components/school/AttendanceForm';

const School = () => {
  const [activeTab, setActiveTab] = useState("classes");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTeacherDialogOpen, setIsTeacherDialogOpen] = useState(false);
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  
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

  // Handlers para diálogos
  const handleClassSuccess = () => {
    setIsDialogOpen(false);
    window.location.reload();
  };

  const handleTeacherSuccess = () => {
    setIsTeacherDialogOpen(false);
    window.location.reload();
  };

  const handleStudentSuccess = () => {
    setIsStudentDialogOpen(false);
    window.location.reload();
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
                <DialogHeader>
                  <DialogTitle>Criar Nova Classe</DialogTitle>
                  <DialogDescription>
                    Preencha as informações para criar uma nova classe na escola dominical.
                  </DialogDescription>
                </DialogHeader>
                <ClassForm 
                  teachers={teachers || []} 
                  onSuccess={handleClassSuccess}
                  onCreateTeacher={() => {
                    setIsDialogOpen(false);
                    setIsTeacherDialogOpen(true);
                  }}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={isTeacherDialogOpen} onOpenChange={setIsTeacherDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Professor</DialogTitle>
                  <DialogDescription>
                    Preencha as informações para cadastrar um novo professor.
                  </DialogDescription>
                </DialogHeader>
                <TeacherForm onSuccess={handleTeacherSuccess} />
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
                <DialogHeader>
                  <DialogTitle>Matricular Aluno</DialogTitle>
                  <DialogDescription>
                    Selecione o membro e a classe para realizar a matrícula.
                  </DialogDescription>
                </DialogHeader>
                <StudentForm 
                  members={members || []} 
                  classes={classes || []} 
                  onSuccess={handleStudentSuccess} 
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <StatCards 
          classCount={classes?.length || 0}
          studentCount={students?.length || 0}
          teacherCount={teachers?.length || 0}
          classesLoading={classesLoading}
          studentsLoading={studentsLoading}
        />

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="students">Alunos</TabsTrigger>
            <TabsTrigger value="attendance">Presenças</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classes" className="space-y-4 mt-6">
            <ClassList 
              classes={classes || []}
              teachers={teachers || []}
              isLoading={classesLoading}
              onCreateClass={() => setIsDialogOpen(true)}
            />
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
                <StudentList 
                  students={students || []}
                  members={members || []}
                  classes={classes || []}
                  isLoading={studentsLoading}
                  onEnrollStudent={() => setIsStudentDialogOpen(true)}
                />
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
                <AttendanceForm 
                  students={students || []}
                  members={members || []}
                  classes={classes || []}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default School;
