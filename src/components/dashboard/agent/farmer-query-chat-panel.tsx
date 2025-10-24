'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockFarmerQueries } from '@/lib/mock-data';
import { Reply, Send } from 'lucide-react';

export default function FarmerQueryChatPanel() {
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow pr-4">
        <div className="space-y-4">
          {mockFarmerQueries.map((query) => (
            <div key={query.id} className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={query.avatar} alt={query.farmerName} />
                <AvatarFallback>{query.farmerName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{query.farmerName}</p>
                  <p className="text-xs text-muted-foreground">
                    {query.timestamp}
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg mt-1 text-sm">
                  {query.query}
                </div>
                <Button variant="ghost" size="sm" className="mt-1 text-muted-foreground">
                    <Reply className="h-4 w-4 mr-2"/>
                    Reply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-4 flex items-center gap-2">
        <Input placeholder="Type your reply..." />
        <Button>
            <Send className="h-4 w-4"/>
        </Button>
      </div>
    </div>
  );
}
