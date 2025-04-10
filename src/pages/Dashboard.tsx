
import MainLayout from '@/components/layout/MainLayout';
import { Users, Church, BookOpen, Calendar, DollarSign, BarChart2 } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import MembershipChart from '@/components/dashboard/MembershipChart';
import DonationReport from '@/components/dashboard/DonationReport';

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-church-purple text-white p-6 rounded-lg shadow-md animate-fade-in">
          <h1 className="text-2xl font-bold">Bem-vindo ao Templo Digital</h1>
          <p className="mt-2 max-w-2xl">
            Sistema integrado de gestão para sua igreja. Visualize estatísticas, 
            gerencie membros, eventos, finanças e mais em um só lugar.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total de Membros"
            value="162"
            icon={<Users className="h-5 w-5" />}
            description="Membros ativos"
            trend={{ value: 8, isPositive: true }}
            color="purple"
          />
          <StatCard
            title="Igrejas"
            value="3"
            icon={<Church className="h-5 w-5" />}
            description="Sede e filiais"
            color="gold"
          />
          <StatCard
            title="Alunos na Escola"
            value="85"
            icon={<BookOpen className="h-5 w-5" />}
            description="Escola Dominical"
            trend={{ value: 12, isPositive: true }}
            color="blue"
          />
          <StatCard
            title="Eventos do Mês"
            value="8"
            icon={<Calendar className="h-5 w-5" />}
            description="Maio/2023"
            trend={{ value: 2, isPositive: true }}
            color="purple"
          />
          <StatCard
            title="Arrecadação Mensal"
            value="R$ 12.500,00"
            icon={<DollarSign className="h-5 w-5" />}
            description="Dízimos e ofertas"
            trend={{ value: 5, isPositive: true }}
            color="green"
          />
          <StatCard
            title="Despesas Mensais"
            value="R$ 8.750,00"
            icon={<BarChart2 className="h-5 w-5" />}
            description="Maio/2023"
            trend={{ value: 3, isPositive: false }}
            color="red"
          />
        </div>
        
        {/* Charts & Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MembershipChart />
          <DonationReport />
        </div>
        
        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <UpcomingEvents />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
