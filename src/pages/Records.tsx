import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, Syringe, Wheat } from 'lucide-react';

const Records = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Farm Records</h1>
        <p className="text-muted-foreground">Comprehensive digital record-keeping for compliance and traceability</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">450</div>
            <div className="text-sm text-muted-foreground">Total Animals</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Syringe className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">94%</div>
            <div className="text-sm text-muted-foreground">Vaccination Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-muted-foreground">Health Records</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Wheat className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold">2.5T</div>
            <div className="text-sm text-muted-foreground">Monthly Feed</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inventory">Animal Inventory</TabsTrigger>
          <TabsTrigger value="health">Health Monitoring</TabsTrigger>
          <TabsTrigger value="vaccination">Vaccination</TabsTrigger>
          <TabsTrigger value="feed">Feed Records</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Animal Inventory Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-lg font-semibold">Pigs - Pen A</div>
                          <div className="text-sm text-muted-foreground">125 animals</div>
                        </div>
                        <Badge>Healthy</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-lg font-semibold">Poultry - Coop 1</div>
                          <div className="text-sm text-muted-foreground">200 birds</div>
                        </div>
                        <Badge>Healthy</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-lg font-semibold">Quarantine Zone</div>
                          <div className="text-sm text-muted-foreground">12 animals</div>
                        </div>
                        <Badge variant="outline">Monitoring</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Monitoring Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1,2,3].map((i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <div className="font-medium">Daily Health Check - Pen {i}</div>
                      <div className="text-sm text-muted-foreground">All animals showing normal behavior</div>
                    </div>
                    <Badge>Normal</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaccination" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vaccination Schedule & Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">Newcastle Disease Vaccine</div>
                        <div className="text-sm text-muted-foreground">Poultry Flock</div>
                      </div>
                      <Badge>Due Soon</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Next due: Jan 25, 2024</div>
                  </div>
                  <div className="p-4 border rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">Swine Fever Vaccine</div>
                        <div className="text-sm text-muted-foreground">Pig Herd</div>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">Last administered: Dec 15, 2023</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feed Management Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="font-medium mb-2">Monthly Feed Consumption</div>
                      <div className="text-2xl font-bold text-primary">2.5 Tonnes</div>
                      <div className="text-sm text-muted-foreground">↑ 5% from last month</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="font-medium mb-2">Feed Cost per Animal</div>
                      <div className="text-2xl font-bold text-accent">₹125</div>
                      <div className="text-sm text-muted-foreground">Average daily cost</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Records;