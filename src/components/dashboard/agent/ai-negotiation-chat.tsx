
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Loader2, Sparkles, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { simulateNegotiation, type NegotiationInput } from '@/ai/flows/negotiation-simulation-flow';
import { Textarea } from '@/components/ui/textarea';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

const initialMessage: Message = {
    role: 'bot',
    text: "I am a negotiation simulation bot. Tell me your offer (crop, quantity, price) and I will respond as a potential buyer.",
};

export default function AiNegotiationChat() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      role: 'user',
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await simulateNegotiation({ agentOffer: input, conversationHistory: messages.map(m => `${m.role}: ${m.text}`) });
      const botMessage: Message = {
        role: 'bot',
        text: response.buyerResponse,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting negotiation response:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Negotiation Bot is currently unavailable.',
      });
      // Do not remove user message on failure to allow retry
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[400px]">
        <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn('flex items-start gap-3', { 'justify-end': message.role === 'user' })}
              >
                {message.role === 'bot' && (
                  <Avatar className="h-8 w-8 border-2 border-primary">
                     <AvatarFallback><Sparkles className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs rounded-lg px-3 py-2 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
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
        <div className="flex w-full items-start space-x-2 pt-4">
          <Textarea
            placeholder="e.g., Offering 1000kg of Tomato at ₹28/kg..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            disabled={isLoading}
            rows={2}
          />
          <Button type="submit" onClick={handleSend} disabled={isLoading} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
    </div>
  );
}
