import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Shield, BookOpen, Activity, FileText, Bell, BarChart3, MessageCircle } from 'lucide-react';
import { MiraChat } from './MiraChat';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMira, setShowMira] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Shield },
    { name: 'Risk Assessment', path: '/risk-assessment', icon: Activity },
    { name: 'Learning', path: '/learning', icon: BookOpen },
    { name: 'Records', path: '/records', icon: FileText },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Alerts', path: '/alerts', icon: Bell },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">FarmSecure</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    asChild
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Link to={item.path}>
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </Button>
                );
              })}
              <Button
                variant="outline"
                onClick={() => setShowMira(true)}
                className="ml-4 flex items-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Mira AI</span>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.name}
                        asChild
                        variant={isActive(item.path) ? "default" : "ghost"}
                        className="justify-start space-x-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link to={item.path}>
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </Button>
                    );
                  })}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowMira(true);
                      setIsOpen(false);
                    }}
                    className="justify-start space-x-2 mt-4"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat with Mira AI</span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <MiraChat isOpen={showMira} onClose={() => setShowMira(false)} />
    </>
  );
};

export default Navigation;