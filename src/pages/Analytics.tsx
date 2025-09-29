import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Shield, Users, AlertTriangle, Download } from 'lucide-react';

const Analytics = () => {
  const keyMetrics = [
    { label: 'Current Risk Score', value: '28%', trend: 'down', icon: Shield, color: 'text-success' },
    { label: 'Compliance Rate', value: '94%', trend: 'up', icon: BarChart3, color: 'text-primary' },
    { label: 'Productivity Index', value: '87%', trend: 'up', icon: TrendingUp, color: 'text-accent' },
    { label: 'Active Alerts', value: '3', trend: 'stable', icon: AlertTriangle, color: 'text-warning' }
  ];

  const animalData = {
    total: 450,
    healthy: 420,
    diseased: 8,
    quarantined: 12,
    new: 10
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor your farm performance and biosecurity metrics</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                  <Badge variant={metric.trend === 'up' ? 'default' : metric.trend === 'down' ? 'secondary' : 'outline'}>
                    {metric.trend}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Animal Health Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Animal Health Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{animalData.total}</div>
              <div className="text-sm text-muted-foreground">Total Animals</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">{animalData.healthy}</div>
              <div className="text-sm text-muted-foreground">Healthy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-destructive">{animalData.diseased}</div>
              <div className="text-sm text-muted-foreground">Diseased</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">{animalData.quarantined}</div>
              <div className="text-sm text-muted-foreground">Quarantined</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{animalData.new}</div>
              <div className="text-sm text-muted-foreground">New Animals</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Healthy Animals</span>
              <span className="text-sm">{Math.round((animalData.healthy / animalData.total) * 100)}%</span>
            </div>
            <Progress value={(animalData.healthy / animalData.total) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;