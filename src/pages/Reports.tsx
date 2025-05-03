
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useSupabaseFetch } from '@/hooks/useSupabaseFetch';
import { Report, Donation, MembershipStat } from '@/types/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { FileText, BarChart as BarChartIcon, Download, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

// Cores para os gráficos
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("membership");
  
  // Buscar dados para os relatórios
  const { data: donations, isLoading: donationsLoading } = useSupabaseFetch<Donation>({
    table: 'donations',
    order: { column: 'month', ascending: true }
  });

  const { data: membershipStats, isLoading: membershipLoading } = useSupabaseFetch<MembershipStat>({
    table: 'membership_stats',
    order: { column: 'month', ascending: true }
  });

  const { data: reports, isLoading: reportsLoading } = useSupabaseFetch<Report>({
    table: 'reports',
    order: { column: 'created_at', ascending: false }
  });

  // Processamento de dados para gráficos
  const donationChartData = donations.map(d => ({
    month: formatMonthYear(d.month),
    dízimos: Number(d.tithes),
    ofertas: Number(d.offerings),
    projetos: Number(d.projects),
    total: Number(d.tithes) + Number(d.offerings) + Number(d.projects)
  }));

  const membershipChartData = membershipStats.map(m => ({
    month: formatMonthYear(m.month),
    membros: Number(m.members),
    visitantes: Number(m.visitors),
    total: Number(m.members) + Number(m.visitors)
  }));

  // Funções auxiliares para formatação
  function formatMonthYear(month: string) {
    if (!month) return '';
    const [year, monthNum] = month.split('-');
    const shortMonthNames = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    return `${shortMonthNames[parseInt(monthNum) - 1]}/${year.slice(2)}`;
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  const handleExportToPDF = (reportType: string) => {
    toast.success(`Exportando relatório de ${reportType} para PDF`);
    // Aqui seria implementada a exportação para PDF
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
            <p className="text-muted-foreground">
              Visualize e exporte relatórios da sua igreja.
            </p>
          </div>
          <div>
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Relatório
            </Button>
          </div>
        </div>

        {/* Relatórios Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-4">
            <TabsTrigger value="membership">Membros</TabsTrigger>
            <TabsTrigger value="finance">Finanças</TabsTrigger>
            <TabsTrigger value="attendance">Frequência</TabsTrigger>
            <TabsTrigger value="saved">Relatórios Salvos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="membership" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Crescimento de Membros</CardTitle>
                    <CardDescription>
                      Evolução do número de membros e visitantes ao longo do tempo
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExportToPDF('membros')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {membershipLoading ? (
                  <div className="flex items-center justify-center h-80">
                    <p>Carregando dados...</p>
                  </div>
                ) : membershipStats.length > 0 ? (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={membershipChartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="membros" stroke="#3b82f6" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="visitantes" stroke="#10b981" />
                        <Line type="monotone" dataKey="total" stroke="#8b5cf6" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-80">
                    <p>Nenhum dado de membros disponível</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Tipo</CardTitle>
                  <CardDescription>
                    Proporção entre membros e visitantes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {membershipLoading ? (
                    <div className="flex items-center justify-center h-60">
                      <p>Carregando dados...</p>
                    </div>
                  ) : membershipStats.length > 0 ? (
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Membros', value: membershipStats.reduce((sum, stat) => sum + Number(stat.members), 0) },
                              { name: 'Visitantes', value: membershipStats.reduce((sum, stat) => sum + Number(stat.visitors), 0) }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {[0, 1].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-60">
                      <p>Nenhum dado disponível</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas Gerais</CardTitle>
                  <CardDescription>
                    Números consolidados da igreja
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {membershipLoading ? (
                    <div className="flex items-center justify-center h-60">
                      <p>Carregando dados...</p>
                    </div>
                  ) : membershipStats.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Total de Membros</p>
                          <p className="text-3xl font-bold">
                            {membershipStats.length > 0 ? 
                              membershipStats[membershipStats.length - 1].members : 0}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Total de Visitantes</p>
                          <p className="text-3xl font-bold">
                            {membershipStats.length > 0 ? 
                              membershipStats[membershipStats.length - 1].visitors : 0}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Taxa de Crescimento</p>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">65% de crescimento no último ano</p>
                      </div>

                      <div className="pt-2">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Retenção de Visitantes</p>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: '40%' }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">40% dos visitantes se tornaram membros</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-60">
                      <p>Nenhum dado disponível</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="finance" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Evolução Financeira</CardTitle>
                    <CardDescription>
                      Histórico financeiro da igreja
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExportToPDF('financeiro')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {donationsLoading ? (
                  <div className="flex items-center justify-center h-80">
                    <p>Carregando dados...</p>
                  </div>
                ) : donations.length > 0 ? (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={donationChartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => value.toLocaleString('pt-BR')} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="dízimos" stackId="a" fill="#3b82f6" />
                        <Bar dataKey="ofertas" stackId="a" fill="#10b981" />
                        <Bar dataKey="projetos" stackId="a" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-80">
                    <p>Nenhum dado financeiro disponível</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Categoria</CardTitle>
                  <CardDescription>
                    Proporção entre dízimos, ofertas e projetos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {donationsLoading ? (
                    <div className="flex items-center justify-center h-60">
                      <p>Carregando dados...</p>
                    </div>
                  ) : donations.length > 0 ? (
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Dízimos', value: donations.reduce((sum, d) => sum + Number(d.tithes), 0) },
                              { name: 'Ofertas', value: donations.reduce((sum, d) => sum + Number(d.offerings), 0) },
                              { name: 'Projetos', value: donations.reduce((sum, d) => sum + Number(d.projects), 0) }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {[0, 1, 2].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-60">
                      <p>Nenhum dado disponível</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumo Financeiro</CardTitle>
                  <CardDescription>
                    Resumo financeiro do último período
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {donationsLoading ? (
                    <div className="flex items-center justify-center h-60">
                      <p>Carregando dados...</p>
                    </div>
                  ) : donations.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Total de Dízimos</p>
                          <p className="text-lg font-bold">
                            {formatCurrency(donations.reduce((sum, d) => sum + Number(d.tithes), 0))}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Total de Ofertas</p>
                          <p className="text-lg font-bold">
                            {formatCurrency(donations.reduce((sum, d) => sum + Number(d.offerings), 0))}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Total de Projetos</p>
                          <p className="text-lg font-bold">
                            {formatCurrency(donations.reduce((sum, d) => sum + Number(d.projects), 0))}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium">Total Geral</p>
                          <p className="text-lg font-bold">
                            {formatCurrency(
                              donations.reduce((sum, d) => 
                                sum + Number(d.tithes) + Number(d.offerings) + Number(d.projects), 0
                              )
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Progresso Meta Anual</p>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: '75%' }}></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-muted-foreground">75% alcançado</p>
                          <p className="text-xs font-medium">
                            {formatCurrency(donations.reduce((sum, d) => 
                              sum + Number(d.tithes) + Number(d.offerings) + Number(d.projects), 0
                            ))} de {formatCurrency(200000)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-60">
                      <p>Nenhum dado disponível</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="attendance" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Frequência nas Aulas</CardTitle>
                    <CardDescription>
                      Estatísticas de frequência na escola dominical
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExportToPDF('frequência')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-80">
                  <p>Dados de frequência em desenvolvimento...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="saved" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Salvos</CardTitle>
                <CardDescription>
                  Relatórios gerados anteriormente
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reportsLoading ? (
                  <div className="flex items-center justify-center h-40">
                    <p>Carregando relatórios...</p>
                  </div>
                ) : reports && reports.length > 0 ? (
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <Card key={report.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-base font-medium">{report.title}</CardTitle>
                            <span className="text-xs bg-muted px-2 py-1 rounded-full">
                              {report.report_type}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground">
                            {report.description || "Sem descrição"}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <FileText className="h-3 w-3 mr-1" />
                            <span>
                              {report.date_range_start && report.date_range_end 
                                ? `Período: ${new Date(report.date_range_start).toLocaleDateString('pt-BR')} a ${new Date(report.date_range_end).toLocaleDateString('pt-BR')}`
                                : `Gerado em: ${new Date(report.created_at || '').toLocaleDateString('pt-BR')}`}
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <Download className="mr-2 h-4 w-4" />
                            Baixar
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-3 p-6">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <p>Nenhum relatório salvo</p>
                    <Button variant="outline">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Gerar Novo Relatório
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Reports;
