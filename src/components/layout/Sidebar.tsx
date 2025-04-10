
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, Users, BookOpen, Calendar, DollarSign, BarChart, 
  Settings, ChevronLeft, ChevronRight, LogOut, Church
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: <Home className="h-5 w-5" /> },
  { name: 'Church', href: '/church', icon: <Church className="h-5 w-5" /> },
  { name: 'People', href: '/people', icon: <Users className="h-5 w-5" /> },
  { name: 'School', href: '/school', icon: <BookOpen className="h-5 w-5" /> },
  { name: 'Events', href: '/events', icon: <Calendar className="h-5 w-5" /> },
  { name: 'Finance', href: '/finance', icon: <DollarSign className="h-5 w-5" /> },
  { name: 'Reports', href: '/reports', icon: <BarChart className="h-5 w-5" /> },
  { name: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "bg-sidebar h-screen flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Church className="h-6 w-6 text-church-gold" />
            <span className="text-sidebar-foreground font-heading font-semibold text-lg">Templo Digital</span>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <Church className="h-6 w-6 text-church-gold" />
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;

            return collapsed ? (
              <TooltipProvider key={item.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center justify-center p-3 rounded-md transition-colors",
                        isActive 
                          ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                    >
                      {item.icon}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        {collapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-full flex justify-center text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Logout</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
