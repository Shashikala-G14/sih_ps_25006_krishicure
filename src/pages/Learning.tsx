import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Play, FileText, Bug, CloudRain, Award, MessageCircle, Clock, CheckCircle } from 'lucide-react';

const Learning = () => {
  const [completedModules, setCompletedModules] = useState<string[]>(['biosecurity-101']);

  const modules = [
    {
      id: 'biosecurity-101',
      title: 'Biosecurity Fundamentals',
      description: 'Basic principles of farm biosecurity for beginners',
      duration: '45 min',
      level: 'Beginner',
      progress: 100,
      topics: ['Entry protocols', 'Disinfection', 'Quarantine procedures']
    },
    {
      id: 'pig-management',
      title: 'Pig Farm Management',
      description: 'Comprehensive guide to pig farm biosecurity practices',
      duration: '60 min',
      level: 'Intermediate',
      progress: 0,
      topics: ['Swine diseases', 'Housing systems', 'Feed management']
    },
    {
      id: 'poultry-care',
      title: 'Poultry Biosecurity',
      description: 'Best practices for poultry farm disease prevention',
      duration: '50 min',
      level: 'Intermediate',
      progress: 0,
      topics: ['Avian influenza', 'Newcastle disease', 'Vaccination']
    },
    {
      id: 'disease-outbreak',
      title: 'Disease Outbreak Response',
      description: 'Emergency protocols for disease outbreak management',
      duration: '40 min',
      level: 'Advanced',
      progress: 0,
      topics: ['Rapid response', 'Containment', 'Reporting procedures']
    },
    {
      id: 'compliance',
      title: 'Regulatory Compliance',
      description: 'Understanding government regulations and requirements',
      duration: '35 min',
      level: 'Intermediate',
      progress: 0,
      topics: ['Legal requirements', 'Documentation', 'Inspections']
    },
    {
      id: 'advanced-biosecurity',
      title: 'Advanced Biosecurity Systems',
      description: 'Implementing sophisticated biosecurity measures',
      duration: '75 min',
      level: 'Advanced',
      progress: 0,
      topics: ['Digital monitoring', 'Risk analysis', 'Technology integration']
    }
  ];

  const resources = [
    {
      type: 'guide',
      title: 'Biosecurity Quick Reference Guide',
      description: 'Downloadable PDF with essential biosecurity protocols',
      icon: FileText
    },
    {
      type: 'database',
      title: 'Disease & Pest Database',
      description: 'Comprehensive information on common farm diseases',
      icon: Bug
    },
    {
      type: 'weather',
      title: 'Weather & Disease Alerts',
      description: 'Real-time weather data linked to disease risks',
      icon: CloudRain
    },
    {
      type: 'certification',
      title: 'Certification Program',
      description: 'Get certified in farm biosecurity management',
      icon: Award
    }
  ];

  const videoTutorials = [
    {
      title: 'Proper Hand Washing Techniques',
      duration: '3:45',
      views: '2.1K',
      description: 'Learn the correct way to wash hands before entering farm areas'
    },
    {
      title: 'Setting Up Disinfection Points',
      duration: '5:20',
      views: '1.8K',
      description: 'Step-by-step guide to establishing effective disinfection stations'
    },
    {
      title: 'Animal Health Monitoring',
      duration: '7:15',
      views: '3.2K',
      description: 'How to conduct daily health checks and identify warning signs'
    },
    {
      title: 'Emergency Response Protocols',
      duration: '6:40',
      views: '1.5K',
      description: 'What to do when you suspect a disease outbreak'
    }
  ];

  const handleStartModule = (moduleId: string) => {
    // In a real app, this would navigate to the actual module content
    console.log(`Starting module: ${moduleId}`);
  };

  const isModuleCompleted = (moduleId: string) => completedModules.includes(moduleId);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-success/10 text-success';
      case 'Intermediate': return 'bg-warning/10 text-warning';
      case 'Advanced': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Learning Center</h1>
        <p className="text-muted-foreground text-lg">
          Master farm biosecurity with our comprehensive training modules
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Learning Progress</CardTitle>
              <CardDescription>Track your biosecurity knowledge advancement</CardDescription>
            </div>
            <Badge className="bg-primary/10 text-primary">
              {completedModules.length} of {modules.length} completed
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round((completedModules.length / modules.length) * 100)}%</span>
            </div>
            <Progress value={(completedModules.length / modules.length) * 100} className="w-full" />
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-success border-success">
                <CheckCircle className="w-3 h-3 mr-1" />
                {completedModules.length} Completed
              </Badge>
              <Badge variant="outline">
                <Clock className="w-3 h-3 mr-1" />
                {modules.length - completedModules.length} Remaining
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="modules" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="modules">Training Modules</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Card key={module.id} className="relative overflow-hidden">
                {isModuleCompleted(module.id) && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <BookOpen className="w-8 h-8 text-primary" />
                    <Badge className={getLevelColor(module.level)}>
                      {module.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {module.duration}
                    </span>
                  </div>
                  
                  {module.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Topics Covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {module.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => handleStartModule(module.id)}
                    variant={isModuleCompleted(module.id) ? "outline" : "default"}
                  >
                    {isModuleCompleted(module.id) ? 'Review Module' : 'Start Learning'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {videoTutorials.map((video, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Play className="w-5 h-5 text-primary" />
                    <Badge variant="outline">{video.duration}</Badge>
                    <Badge variant="secondary">{video.views} views</Badge>
                  </div>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Mira AI Assistant CTA */}
      <Card className="mt-8 bg-gradient-primary text-white">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-8 h-8" />
            <div>
              <CardTitle>Need Help Learning?</CardTitle>
              <CardDescription className="text-white/80">
                Chat with Mira AI for personalized guidance and answers to your questions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
            Chat with Mira AI
            <MessageCircle className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Learning;