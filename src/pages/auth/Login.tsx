
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Church } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (email === 'admin@igreja.com' && password === 'password') {
        toast({
          title: "Login bem-sucedido!",
          description: "Bem-vindo ao Templo Digital.",
        });
        navigate('/');
      } else {
        toast({
          title: "Falha no login",
          description: "Email ou senha inválidos. Tente novamente.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-church-purple/5 to-church-gold/5">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-church-purple p-3 rounded-full">
            <Church className="h-8 w-8 text-white" />
          </div>
        </div>
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-heading">Templo Digital</CardTitle>
            <CardDescription className="text-center">
              Entre com sua conta para acessar o sistema
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <a href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <a href="/auth/register" className="text-primary hover:underline">
                  Entre em contato
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

export default Login;
