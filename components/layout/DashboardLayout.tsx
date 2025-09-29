import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Users, FileText, Video, BarChart3, Settings, Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/ui/mode-toggle";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div 
              className="flex items-center space-x-3 cursor-pointer transition-smooth hover:opacity-80"
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">HRTech Portal</h1>
                <p className="text-xs text-muted-foreground">Smart Recruitment System</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent">
                3
              </Badge>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/settings')}
            >
              <Settings className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full"></div>
              <div className="text-sm">
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 border-r border-border/50 bg-card/50 backdrop-blur-sm min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-2">
                Dashboard
              </h3>
              <Button variant="ghost" className="w-full justify-start text-primary bg-primary/10">
                <BarChart3 className="w-4 h-4 mr-3" />
                Analytics Overview
              </Button>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-2 pt-4">
                Recruitment Portal
              </h3>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/resume-analyzer')}
              >
                <FileText className="w-4 h-4 mr-3" />
                Resume Analyzer
                <Badge variant="secondary" className="ml-auto">AI</Badge>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/interview-analysis')}
              >
                <Video className="w-4 h-4 mr-3" />
                Interview Analysis
                <Badge variant="secondary" className="ml-auto">AI</Badge>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/candidate-pipeline')}
              >
                <Users className="w-4 h-4 mr-3" />
                Candidate Pipeline
              </Button>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-2 pt-4">
                Management
              </h3>
              <Button variant="ghost" className="w-full justify-start">
                <Building2 className="w-4 h-4 mr-3" />
                Job Postings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="w-4 h-4 mr-3" />
                Team Management
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};