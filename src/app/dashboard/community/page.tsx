
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockCommunityMessages } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Send, User } from 'lucide-react';

export default function CommunityPage() {
  return (
    <Card className="h-[80vh] flex flex-col">
      <CardHeader>
        <CardTitle>🌾 Farmer's Community Hub</CardTitle>
        <CardDescription>
          Connect with nearby farmers, share updates, and get advice.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-grow pr-4">
          <div className="space-y-6">
            {mockCommunityMessages.map((message) => (
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
            disabled
          />
          <Button type="submit" disabled>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-center text-muted-foreground pt-2">
            Community chat is currently in preview. Real-time messaging will be enabled soon.
        </p>
      </CardContent>
    </Card>
  );
}
