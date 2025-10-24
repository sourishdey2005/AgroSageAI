'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Loader2, Sparkles, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { answerCropQuestion } from '@/ai/flows/answer-crop-questions';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: number;
  role: 'user' | 'bot';
  text: string;
};

const initialMessage: Message = {
    id: 1,
    role: 'bot',
    text: "Hello! I'm AgroBot. Ask me anything about crop treatment, prices, or farming.",
};

export default function ChatbotTab() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await answerCropQuestion({ question: input });
      const botMessage: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: response.answer,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting answer:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'AgroBot is currently unavailable. Please try again later.',
      });
      setMessages(prev => prev.slice(0, prev.length -1)); // remove user message if bot fails
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-[70vh] flex flex-col">
      <CardHeader>
        <CardTitle>AI Chat Assistant (AgroBot)</CardTitle>
        <CardDescription>Your personal AI assistant for all farming-related queries.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn('flex items-start gap-3', { 'justify-end': message.role === 'user' })}
              >
                {message.role === 'bot' && (
                  <Avatar className="h-8 w-8 border-2 border-primary">
                     <AvatarFallback><Sparkles className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs md:max-w-md lg:max-w-xl rounded-lg px-4 py-2 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {message.text}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8 border-2 border-muted">
                    <AvatarFallback><UserIcon className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
                 <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 border-2 border-primary">
                        <AvatarFallback><Sparkles className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-4 py-2 flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex w-full items-center space-x-2 pt-4">
          <Input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <Button type="submit" onClick={handleSend} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
