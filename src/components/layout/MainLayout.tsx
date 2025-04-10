
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
        <footer className="bg-background border-t py-2 px-6 text-center text-sm text-muted-foreground">
          Templo Digital © {new Date().getFullYear()} - Sistema de Gestão para Igrejas
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
