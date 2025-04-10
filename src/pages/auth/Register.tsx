
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Church } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [churchName, setChurchName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Senhas não conferem",
        description: "Por favor, verifique se as senhas são idênticas.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registro solicitado!",
        description: "Sua solicitação foi enviada para análise. Entraremos em contato em breve.",
      });
      navigate('/auth/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-church-purple/5 to-church-gold/5 py-10">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-church-purple p-3 rounded-full">
            <Church className="h-8 w-8 text-white" />
          </div>
        </div>
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-heading">Cadastre sua Igreja</CardTitle>
            <CardDescription className="text-center">
              Preencha os dados abaixo para solicitar acesso ao sistema
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="churchName">Nome da Igreja</Label>
                <Input
                  id="churchName"
                  type="text"
                  placeholder="Nome da sua igreja"
                  value={churchName}
                  onChange={(e) => setChurchName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Crie uma senha forte"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirme a senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repita a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Solicitar acesso"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <a href="/auth/login" className="text-primary hover:underline">
                  Faça login
                </a>
              </div>
            </CardFooter>
          </form>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Templo Digital © {new Date().getFullYear()} - Sistema de Gestão para Igrejas
        </p>
      </div>
    </div>
  );
};

export default Register;
