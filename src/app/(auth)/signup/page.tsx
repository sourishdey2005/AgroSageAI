import { SignupForm } from "@/components/auth/signup-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function SignupPage() {
    return (
        <div className="flex flex-col items-center gap-6">
            <SignupForm />
            <Card className="w-full max-w-sm border-dashed">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5" /> Prototype Logins</CardTitle>
                    <CardDescription>
                        Use these credentials to explore other user roles.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                    <div className="mb-2">
                        <p className="font-semibold">Agent:</p>
                        <p>Email: <span className="font-mono">agent@agrosage.com</span></p>
                        <p>Password: <span className="font-mono">password123</span></p>
                    </div>
                    <div>
                        <p className="font-semibold">Government:</p>
                        <p>Email: <span className="font-mono">government@agrosage.com</span></p>
                        <p>Password: <span className="font-mono">password123</span></p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
