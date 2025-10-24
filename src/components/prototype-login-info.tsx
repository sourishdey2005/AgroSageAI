
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function PrototypeLoginInfo() {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <Button size="icon" onClick={() => setIsOpen(true)} variant="outline" className="rounded-full shadow-lg">
                    <Info className="h-5 w-5" />
                </Button>
            </div>
        );
    }

    return (
        <Card className="fixed bottom-4 right-4 z-50 w-full max-w-sm border-dashed bg-background/90 backdrop-blur-sm">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
            </Button>
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5" /> Prototype Logins</CardTitle>
                <CardDescription>
                    Use these credentials to explore other user roles.
                </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
                <div className="mb-4">
                    <p className="font-semibold text-base">Agent Role</p>
                    <p>Email: <span className="font-mono">agent@agrosage.com</span></p>
                    <p>Password: <span className="font-mono">password123</span></p>
                </div>
                <div>
                    <p className="font-semibold text-base">Government Role</p>
                    <p>Email: <span className="font-mono">government@agrosage.com</span></p>
                    <p>Password: <span className="font-mono">password123</span></p>
                </div>
            </CardContent>
        </Card>
    );
}
