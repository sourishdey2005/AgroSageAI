import { AgroSageLogo } from "@/components/icons";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="absolute top-6 left-6">
            <Link href="/" className="flex items-center gap-2">
                <AgroSageLogo className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-headline">
                AgroSage AI
                </span>
            </Link>
        </div>
      {children}
    </div>
  );
}
