
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AgroSageLogo } from '@/components/icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { User as Farmer, Shield, Briefcase } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === 'hero-background'
  );
  const [open, setOpen] = useState(false);

  const handleRoleSelect = (role: string) => {
    setOpen(false);
    router.push(role);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="absolute top-0 left-0 right-0 p-4 z-10 bg-transparent">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <AgroSageLogo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline text-white">
              AgroSage AI
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Select Your Role</DialogTitle>
                  <DialogDescription>
                    Choose your role to log in to the appropriate dashboard.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4 py-4">
                  <Card
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleRoleSelect('/login')}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <Farmer className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">Farmer</h3>
                        <p className="text-sm text-muted-foreground">
                          Access your farm dashboard.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleRoleSelect('/login/agent')}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <Briefcase className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">Agent</h3>
                        <p className="text-sm text-muted-foreground">
                          Access the agent portal.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleRoleSelect('/login/government')}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <Shield className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">Government</h3>
                        <p className="text-sm text-muted-foreground">
                          Access official dashboards.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="default"
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative h-screen flex items-center justify-center text-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 leading-tight tracking-tighter">
              Empowering Indian Farmers with Predictive AI
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              AgroSage AI is an autonomous farm-to-market decision platform
              that helps you detect crop diseases, predict prices, and maximize
              your profits.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full p-4 bg-background">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} AgroSage AI. Made for a brighter
            farming future in India 🇮🇳
          </p>
        </div>
      </footer>
    </div>
  );
}
