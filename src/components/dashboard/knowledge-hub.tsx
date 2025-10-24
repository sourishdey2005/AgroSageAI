
'use client';

import { useEffect, useState } from 'react';
import { getFarmingKnowledge, type FarmingKnowledgeOutput } from '@/ai/flows/knowledge-hub-flow';
import { Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from '../ui/scroll-area';


type KnowledgeItem = FarmingKnowledgeOutput['knowledge'][0];

export default function KnowledgeHub() {
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchKnowledge = async () => {
      setIsLoading(true);
      try {
        const response = await getFarmingKnowledge({ crop: 'Tomato' });
        setKnowledge(response.knowledge);
      } catch (error) {
        console.error('Error fetching farming knowledge:', error);
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: 'Could not fetch farming best practices.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchKnowledge();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (knowledge.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <AlertCircle className="mr-2 h-4 w-4" />
        No knowledge base articles found.
      </div>
    );
  }

  return (
    <ScrollArea className="h-96 pr-4">
        <Accordion type="single" collapsible className="w-full">
        {knowledge.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>
                {item.tip}
                </AccordionContent>
            </AccordionItem>
        ))}
        </Accordion>
    </ScrollArea>
  );
}
