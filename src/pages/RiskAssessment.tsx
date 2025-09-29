import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Activity, CheckCircle, AlertTriangle, XCircle, FileText, Shield, Users, MapPin } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; score: number }[];
  category: string;
}

const RiskAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 'farm_type',
      question: 'What type of farm do you operate?',
      options: [
        { value: 'pig_only', label: 'Pig farm only', score: 2 },
        { value: 'poultry_only', label: 'Poultry farm only', score: 2 },
        { value: 'mixed', label: 'Mixed (pigs and poultry)', score: 4 },
        { value: 'integrated', label: 'Integrated with other livestock', score: 5 }
      ],
      category: 'Farm Profile'
    },
    {
      id: 'farm_size',
      question: 'How many animals do you maintain?',
      options: [
        { value: 'small', label: 'Less than 100 animals', score: 1 },
        { value: 'medium', label: '100-500 animals', score: 2 },
        { value: 'large', label: '500-1000 animals', score: 3 },
        { value: 'commercial', label: 'More than 1000 animals', score: 4 }
      ],
      category: 'Farm Profile'
    },
    {
      id: 'location_risk',
      question: 'How would you describe your farm location?',
      options: [
        { value: 'isolated', label: 'Isolated with no nearby farms', score: 1 },
        { value: 'rural', label: 'Rural area with some farms nearby', score: 2 },
        { value: 'dense', label: 'High density farming area', score: 4 },
        { value: 'urban', label: 'Near urban/market areas', score: 3 }
      ],
      category: 'Location'
    },
    {
      id: 'visitor_control',
      question: 'How do you control farm visitors?',
      options: [
        { value: 'strict', label: 'Strict protocols with disinfection', score: 1 },
        { value: 'basic', label: 'Basic visitor log and restrictions', score: 2 },
        { value: 'minimal', label: 'Minimal visitor control', score: 4 },
        { value: 'none', label: 'No visitor control measures', score: 5 }
      ],
      category: 'Biosecurity'
    },
    {
      id: 'quarantine',
      question: 'Do you quarantine new animals?',
      options: [
        { value: 'always', label: 'Always quarantine for 14+ days', score: 1 },
        { value: 'sometimes', label: 'Sometimes quarantine', score: 3 },
        { value: 'rarely', label: 'Rarely quarantine', score: 4 },
        { value: 'never', label: 'Never quarantine', score: 5 }
      ],
      category: 'Biosecurity'
    },
    {
      id: 'vaccination',
      question: 'How up-to-date are your vaccination protocols?',
      options: [
        { value: 'current', label: 'All vaccinations current and documented', score: 1 },
        { value: 'mostly', label: 'Most vaccinations up to date', score: 2 },
        { value: 'some', label: 'Some vaccinations missing', score: 4 },
        { value: 'none', label: 'No vaccination program', score: 5 }
      ],
      category: 'Health Management'
    },
    {
      id: 'feed_source',
      question: 'What is your primary feed source?',
      options: [
        { value: 'commercial', label: 'Commercial feed from certified suppliers', score: 1 },
        { value: 'mixed', label: 'Mix of commercial and farm-grown', score: 2 },
        { value: 'farm_grown', label: 'Mainly farm-grown feed', score: 3 },
        { value: 'unknown', label: 'Multiple sources, not always verified', score: 4 }
      ],
      category: 'Feed & Water'
    },
    {
      id: 'water_source',
      question: 'What is your primary water source?',
      options: [
        { value: 'treated', label: 'Treated municipal or well water', score: 1 },
        { value: 'well', label: 'Private well (tested regularly)', score: 2 },
        { value: 'surface', label: 'Surface water (river/pond)', score: 4 },
        { value: 'untested', label: 'Untested water sources', score: 5 }
      ],
      category: 'Feed & Water'
    },
    {
      id: 'waste_management',
      question: 'How do you manage farm waste?',
      options: [
        { value: 'proper', label: 'Proper composting and disposal system', score: 1 },
        { value: 'basic', label: 'Basic waste management practices', score: 2 },
        { value: 'minimal', label: 'Minimal waste management', score: 4 },
        { value: 'poor', label: 'Poor or no waste management', score: 5 }
      ],
      category: 'Sanitation'
    },
    {
      id: 'disease_history',
      question: 'Any disease outbreaks in the last 2 years?',
      options: [
        { value: 'none', label: 'No disease outbreaks', score: 1 },
        { value: 'minor', label: 'Minor issues, quickly resolved', score: 2 },
        { value: 'moderate', label: 'Moderate outbreaks with some losses', score: 4 },
        { value: 'severe', label: 'Severe outbreaks with significant losses', score: 5 }
      ],
      category: 'Health History'
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateRisk = () => {
    const totalScore = questions.reduce((sum, question) => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        return sum + (option?.score || 0);
      }
      return sum;
    }, 0);

    const maxScore = questions.reduce((sum, question) => sum + Math.max(...question.options.map(opt => opt.score)), 0);
    const riskPercentage = Math.round((totalScore / maxScore) * 100);

    if (riskPercentage <= 30) {
      return { level: 'Low', color: 'text-success', bgColor: 'bg-success', score: riskPercentage };
    } else if (riskPercentage <= 60) {
      return { level: 'Medium', color: 'text-warning', bgColor: 'bg-warning', score: riskPercentage };
    } else {
      return { level: 'High', color: 'text-destructive', bgColor: 'bg-destructive', score: riskPercentage };
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Low': return CheckCircle;
      case 'Medium': return AlertTriangle;
      case 'High': return XCircle;
      default: return Activity;
    }
  };

  const getImmediateActions = (level: string) => {
    switch (level) {
      case 'Low':
        return [
          'Maintain current biosecurity protocols',
          'Continue regular health monitoring',
          'Schedule quarterly biosecurity reviews'
        ];
      case 'Medium':
        return [
          'Strengthen visitor control measures',
          'Review and update vaccination schedules',
          'Improve quarantine facilities',
          'Enhance feed source verification'
        ];
      case 'High':
        return [
          'Implement emergency biosecurity protocols',
          'Establish immediate quarantine zones',
          'Contact veterinary services urgently',
          'Restrict all non-essential farm access',
          'Review and test water sources immediately'
        ];
      default:
        return [];
    }
  };

  if (showResults) {
    const risk = calculateRisk();
    const RiskIcon = getRiskIcon(risk.level);
    const actions = getImmediateActions(risk.level);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Results Header */}
          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className={`w-16 h-16 rounded-full ${risk.bgColor}/10 flex items-center justify-center`}>
                  <RiskIcon className={`w-8 h-8 ${risk.color}`} />
                </div>
              </div>
              <CardTitle className="text-2xl">Risk Assessment Complete</CardTitle>
              <CardDescription>Your farm's biosecurity risk analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${risk.color} mb-2`}>{risk.score}%</div>
                  <Badge className={`${risk.bgColor} text-white text-lg px-4 py-2`}>
                    {risk.level} Risk Level
                  </Badge>
                </div>
                <Progress value={risk.score} className="w-full h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Immediate Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Immediate Actions Required
              </CardTitle>
              <CardDescription>
                Based on your assessment, here are the priority actions for your farm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {actions.map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <span className="text-sm">{action}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resources & Support */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Recommended Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Risk Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Biosecurity Guidelines
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Contact Expert Support
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  Schedule Follow-up Assessment
                </Button>
                <Button variant="outline" className="w-full">
                  Access Learning Modules
                </Button>
                <Button variant="outline" className="w-full">
                  Set Up Monitoring Alerts
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => {
              setShowResults(false);
              setCurrentQuestion(0);
              setAnswers({});
            }}>
              Take Assessment Again
            </Button>
            <Button variant="outline">
              Save Results
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="text-2xl flex items-center">
                  <Activity className="w-6 h-6 mr-2" />
                  Farm Risk Assessment
                </CardTitle>
                <CardDescription>
                  Evaluate your farm's biosecurity risks with our comprehensive assessment
                </CardDescription>
              </div>
              <Badge variant="outline">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{question.category}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardHeader>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
            <CardDescription>
              Select the option that best describes your current situation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={currentAnswer} 
              onValueChange={(value) => handleAnswer(question.id, value)}
            >
              <div className="space-y-3">
                {question.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious} 
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!currentAnswer}
          >
            {currentQuestion === questions.length - 1 ? 'View Results' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;