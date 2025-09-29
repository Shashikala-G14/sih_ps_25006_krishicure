import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, Lightbulb, Shield } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'mira';
  timestamp: Date;
  suggestions?: string[];
}

interface MiraChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MiraChat = ({ isOpen, onClose }: MiraChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "नमस्ते! मैं मीरा हूँ, आपकी AI सहायक। मैं हिंदी और अंग्रेजी में किसानों की मदद करती हूँ। / Hello! I'm Mira, your AI assistant. I help farmers in Hindi and English with biosecurity and farm management.",
      sender: 'mira',
      timestamp: new Date(),
      suggestions: ['Vaccination schedule', 'Disease prevention', 'Feed management', 'Animal health']
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const sampleResponses = {
    vaccination: {
      en: "For pig vaccination schedule: Swine fever vaccine at 12-16 weeks, repeat annually. For poultry: Newcastle disease at day 1, repeat every 6 months. Always consult your veterinarian for specific schedules.",
      hi: "सूअर टीकाकरण अनुसूची: 12-16 सप्ताह में स्वाइन बुखार का टीका, सालाना दोहराएं। मुर्गी के लिए: पहले दिन न्यूकैसल रोग का टीका, हर 6 महीने में दोहराएं।"
    },
    biosecurity: {
      en: "Key biosecurity measures: 1) Disinfect entry points 2) Quarantine new animals 3) Control visitor access 4) Maintain proper drainage 5) Regular health monitoring",
      hi: "मुख्य जैव सुरक्षा उपाय: 1) प्रवेश बिंदुओं को कीटाणुरहित करें 2) नए जानवरों को अलग रखें 3) आगंतुकों की पहुंच नियंत्रित करें 4) उचित निकासी बनाए रखें 5) नियमित स्वास्थ्य निगरानी"
    },
    disease: {
      en: "Common symptoms to watch: Loss of appetite, lethargy, respiratory issues, diarrhea, unusual behavior. Immediately isolate affected animals and contact veterinarian.",
      hi: "देखने योग्य सामान्य लक्षण: भूख न लगना, सुस्ती, सांस की समस्या, दस्त, असामान्य व्यवहार। तुरंत प्रभावित जानवरों को अलग करें और पशु चिकित्सक से संपर्क करें।"
    },
    feed: {
      en: "Feed management tips: Store feed in dry, rodent-proof containers. Check expiry dates. Provide clean water daily. Monitor feed consumption patterns for health indicators.",
      hi: "आहार प्रबंधन सुझाव: आहार को सूखे, कृंतक-रोधी कंटेनर में रखें। समाप्ति तिथि की जांच करें। रोज साफ पानी दें। स्वास्थ्य संकेतकों के लिए आहार सेवन पैटर्न की निगरानी करें।"
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simple keyword matching for demo responses
    const lowercaseMessage = newMessage.toLowerCase();
    let response = "";
    let suggestions: string[] = [];

    if (lowercaseMessage.includes('vaccination') || lowercaseMessage.includes('vaccine') || lowercaseMessage.includes('टीका')) {
      response = sampleResponses.vaccination[language];
      suggestions = ['Vaccination records', 'Disease prevention', 'Health monitoring'];
    } else if (lowercaseMessage.includes('biosecurity') || lowercaseMessage.includes('security') || lowercaseMessage.includes('सुरक्षा')) {
      response = sampleResponses.biosecurity[language];
      suggestions = ['Entry protocols', 'Quarantine procedures', 'Visitor management'];
    } else if (lowercaseMessage.includes('disease') || lowercaseMessage.includes('sick') || lowercaseMessage.includes('बीमारी')) {
      response = sampleResponses.disease[language];
      suggestions = ['Health records', 'Veterinary contacts', 'Isolation protocols'];
    } else if (lowercaseMessage.includes('feed') || lowercaseMessage.includes('food') || lowercaseMessage.includes('आहार')) {
      response = sampleResponses.feed[language];
      suggestions = ['Feed records', 'Nutrition guidelines', 'Water quality'];
    } else {
      response = language === 'hi' 
        ? "मैं आपकी मदद करना चाहूंगी! कृपया टीकाकरण, जैव सुरक्षा, बीमारी की रोकथाम, या आहार प्रबंधन के बारे में पूछें।"
        : "I'd be happy to help! Please ask about vaccination, biosecurity, disease prevention, or feed management.";
      suggestions = ['Vaccination schedule', 'Biosecurity measures', 'Disease symptoms', 'Feed guidelines'];
    }

    setTimeout(() => {
      const miraMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'mira',
        timestamp: new Date(),
        suggestions
      };
      setMessages(prev => [...prev, miraMessage]);
    }, 1000);

    setNewMessage('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>Mira AI Assistant</span>
            <div className="flex space-x-2 ml-auto">
              <Button
                size="sm"
                variant={language === 'en' ? 'default' : 'outline'}
                onClick={() => setLanguage('en')}
              >
                EN
              </Button>
              <Button
                size="sm"
                variant={language === 'hi' ? 'default' : 'outline'}
                onClick={() => setLanguage('hi')}
              >
                हिं
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col space-y-4">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div className={`flex items-start space-x-2 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    {message.sender === 'mira' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <Card className={`max-w-[80%] ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <CardContent className="p-3">
                        <p className="text-sm">{message.text}</p>
                      </CardContent>
                    </Card>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-accent" />
                      </div>
                    )}
                  </div>
                  
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-2 ml-10">
                      {message.suggestions.map((suggestion, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-accent/20"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <Lightbulb className="h-3 w-3 mr-1" />
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="flex space-x-2">
            <Input
              placeholder={language === 'hi' ? 'अपना प्रश्न पूछें...' : 'Ask your question...'}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};