
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Users, Calendar, Clock, Plus } from 'lucide-react';

const Church = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Igrejas</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nova Igreja
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <div className="h-36 bg-church-purple/20 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-church-purple">Igreja Sede</h3>
            </div>
            <CardHeader className="pb-2">
              <CardTitle>Igreja Batista Central</CardTitle>
              <CardDescription>Sede Principal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Av. Principal, 1234, Centro - São Paulo</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">(11) 3456-7890</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">contato@igrejasede.org</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">120 membros</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Fundada em 02/05/2000</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Cultos: Quarta 19h30, Domingo 10h e 18h30</span>
                </div>
                <div className="pt-4">
                  <Button variant="outline" size="sm" className="w-full">Ver detalhes</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-36 bg-church-gold/20 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-church-gold">Filial</h3>
            </div>
            <CardHeader className="pb-2">
              <CardTitle>Igreja Batista Zona Leste</CardTitle>
              <CardDescription>Filial 1</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Rua das Flores, 567, Zona Leste - São Paulo</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">(11) 2345-6789</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">contato@igrejazonaleste.org</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">45 membros</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Fundada em 15/08/2015</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Cultos: Sábado 19h, Domingo 18h</span>
                </div>
                <div className="pt-4">
                  <Button variant="outline" size="sm" className="w-full">Ver detalhes</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-36 bg-blue-500/20 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-blue-500">Filial</h3>
            </div>
            <CardHeader className="pb-2">
              <CardTitle>Igreja Batista Zona Sul</CardTitle>
              <CardDescription>Filial 2</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Av. Sul, 789, Zona Sul - São Paulo</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">(11) 4567-8901</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">contato@igrejazonasul.org</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">38 membros</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Fundada em 10/03/2018</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Cultos: Sexta 19h30, Domingo 19h</span>
                </div>
                <div className="pt-4">
                  <Button variant="outline" size="sm" className="w-full">Ver detalhes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Church;
