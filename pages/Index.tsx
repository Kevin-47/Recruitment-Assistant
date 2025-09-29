import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, FileText, Video, BarChart3, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Applications",
      value: "1,234",
      change: "+12%",
      icon: FileText,
      color: "text-primary"
    },
    {
      title: "Interviews Scheduled", 
      value: "89",
      change: "+8%",
      icon: Video,
      color: "text-accent"
    },
    {
      title: "Candidates Hired",
      value: "23",
      change: "+15%", 
      icon: CheckCircle,
      color: "text-success"
    },
    {
      title: "Average Score",
      value: "78%",
      change: "+3%",
      icon: BarChart3,
      color: "text-warning"
    }
  ];

  const recentActivity = [
    {
      candidate: "Sarah Johnson",
      action: "Resume analyzed",
      score: 92,
      time: "2 hours ago",
      status: "Excellent"
    },
    {
      candidate: "Michael Chen", 
      action: "Interview completed",
      score: 88,
      time: "4 hours ago",
      status: "Good"
    },
    {
      candidate: "Emily Rodriguez",
      action: "Technical assessment",
      score: 85, 
      time: "6 hours ago",
      status: "Good"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-hero rounded-xl p-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome to HRTech Portal</h1>
              <p className="text-white/90">Smart recruitment powered by AI analysis</p>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-smooth">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-success flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-secondary flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with your recruitment process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* <Button 
                onClick={() => navigate('/complete-analysis')}
                className="h-20 flex flex-col items-center justify-center space-y-2"
                variant="default"
              >
                <FileText className="w-6 h-6" />
                <span>Complete Analysis</span>
              </Button> */}
              <Button 
  onClick={() => navigate('/resume-analyzer')}
  className="h-20 flex flex-col items-center justify-center space-y-2"
  variant="default"
>
  <FileText className="w-6 h-6" />
  <span>Resume Analyzer</span>
</Button>
              <Button 
                onClick={() => navigate('/interview-analysis')}
                className="h-20 flex flex-col items-center justify-center space-y-2"
                variant="outline"
              >
                <Video className="w-6 h-6" />
                <span>Interview Analysis</span>
              </Button>
              <Button 
                onClick={() => navigate('/candidate-pipeline')}
                className="h-20 flex flex-col items-center justify-center space-y-2"
                variant="outline"
              >
                <Users className="w-6 h-6" />
                <span>View Candidates</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest recruitment activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.candidate}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge 
                        variant={activity.status === 'Excellent' ? 'default' : 'secondary'}
                        className="mb-1"
                      >
                        {activity.score}% - {activity.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;
