'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Map, Ship, Truck } from "lucide-react";

export function LogisticsPlanner() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                    <Truck className="h-10 w-10 text-primary" />
                    <h3 className="font-semibold">Ground Transport</h3>
                    <p className="text-xs text-muted-foreground">150+ trucks available</p>
                    <Button size="sm" variant="outline" className="mt-2">Book Now</Button>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                    <Ship className="h-10 w-10 text-primary" />
                    <h3 className="font-semibold">Sea Freight</h3>
                    <p className="text-xs text-muted-foreground">Connections to 20+ ports</p>
                    <Button size="sm" variant="outline" className="mt-2">Get Quote</Button>
                </CardContent>
            </Card>
             <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                    <Map className="h-10 w-10 text-primary" />
                    <h3 className="font-semibold">Route Optimization</h3>
                    <p className="text-xs text-muted-foreground">AI-powered route planning</p>
                    <Button size="sm" variant="outline" className="mt-2">Optimize Route</Button>
                </CardContent>
            </Card>
        </div>
    )
}
