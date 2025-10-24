
'use client';

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockCommunityMessages } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Send, User } from 'lucide-react';

type Message = {
    id: number;
    author: string;
    avatar?: string;
    text: string;
    timestamp: string;
    isCurrentUser: boolean;
};

export default function CommunityPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('community-messages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        // Seed with mock data if local storage is empty
        setMessages(mockCommunityMessages);
        localStorage.setItem('community-messages', JSON.stringify(mockCommunityMessages));
      }
    } catch (error) {
        console.error("Could not load messages from localStorage", error);
        setMessages(mockCommunityMessages);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
        try {
            localStorage.setItem('community-messages', JSON.stringify(messages));
        } catch (error) {
            console.error("Could not save messages to localStorage", error);
        }
    }
     // Scroll to bottom when new messages are added
     if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      id: Date.now(),
      author: 'You',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
    };

    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <Card className="h-[80vh] flex flex-col">
      <CardHeader>
        <CardTitle>🌾 Farmer's Community Hub</CardTitle>
        <CardDescription>
          Connect with nearby farmers, share updates, and get advice. (Messages stored locally)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-start gap-3',
                  message.isCurrentUser && 'justify-end'
                )}
              >
                {!message.isCurrentUser && (
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={message.avatar} alt={message.author} />
                    <AvatarFallback>{message.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col gap-1">
                    <div className={cn('text-xs text-muted-foreground', message.isCurrentUser && 'text-right')}>{message.author}</div>
                    <div
                        className={cn(
                        'max-w-xs md:max-w-md lg:max-w-xl rounded-lg px-4 py-2 text-sm',
                        message.isCurrentUser
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                    >
                        <p>{message.text}</p>
                    </div>
                     <div className={cn('text-xs text-muted-foreground/80', message.isCurrentUser && 'text-right')}>{message.timestamp}</div>
                </div>

                {message.isCurrentUser && (
                  <Avatar className="h-10 w-10 border">
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex w-full items-center space-x-2 pt-4">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button type="submit" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
