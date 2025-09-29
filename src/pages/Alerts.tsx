import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, Info, Phone } from 'lucide-react';

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      title: 'Avian Influenza Alert - Regional',
      description: 'H5N1 detected in neighboring district. Enhance biosecurity measures immediately.',
      severity: 'high',
      date: '2024-01-15',
      status: 'active',
      actions: ['Restrict farm access', 'Increase disinfection', 'Monitor bird health']
    },
    {
      id: 2,
      title: 'Vaccination Reminder',
      description: 'Newcastle disease vaccination due for poultry flock #3',
      severity: 'medium',
      date: '2024-01-14',
      status: 'pending',
      actions: ['Schedule vaccination', 'Contact veterinarian']
    },
    {
      id: 3,
      title: 'African Swine Fever Warning',
      description: 'ASF cases reported 50km away. Monitor pig health closely.',
      severity: 'high',
      date: '2024-01-13',
      status: 'active',
      actions: ['Isolate new pigs', 'Check temperatures daily', 'Restrict pig movement']
    }
  ];

  const emergencyContacts = [
    { name: 'District Veterinary Officer', phone: '+91-9876543210' },
    { name: 'Emergency Hotline', phone: '1962' },
    { name: 'Local Vet Clinic', phone: '+91-9876543211' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Disease Alerts</h1>
          <p className="text-muted-foreground">Stay informed about disease outbreaks and farm notifications</p>
        </div>
        <Badge className="bg-destructive">3 Active Alerts</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className={`border-l-4 ${
              alert.severity === 'high' ? 'border-l-destructive' : 
              alert.severity === 'medium' ? 'border-l-warning' : 'border-l-accent'
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className={`w-5 h-5 ${
                      alert.severity === 'high' ? 'text-destructive' : 
                      alert.severity === 'medium' ? 'text-warning' : 'text-accent'
                    }`} />
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                  </div>
                  <Badge variant={alert.status === 'active' ? 'destructive' : 'secondary'}>
                    {alert.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{alert.description}</p>
                <div>
                  <h4 className="font-medium mb-2">Recommended Actions:</h4>
                  <ul className="space-y-1">
                    {alert.actions.map((action, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm">Mark as Read</Button>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-muted-foreground">{contact.phone}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;