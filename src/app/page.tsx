"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Platform } from "@/lib/mock-data";
import Link from "next/link";
import {
  SiLinkedin,
  SiFacebook,
  SiInstagram,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { Twitter, Plus, Sparkles, BarChart3, Brain, Zap } from "lucide-react";
import { ModeToggle } from "@/components/themes/mode-toggle";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import GlowingCard from "@/components/ui/glowing-card";

const platforms: {
  name: Platform;
  icon: React.ElementType;
  color: string;
}[] = [
  { name: "Twitter", icon: Twitter, color: "#1DA1F2" },
  { name: "LinkedIn", icon: SiLinkedin, color: "#0A66C2" },
  { name: "Facebook", icon: SiFacebook, color: "#1877F2" },
  { name: "Instagram", icon: SiInstagram, color: "#E4405F" },
  { name: "YouTube", icon: SiYoutube, color: "#FF0000" },
];

const features = [
  {
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze platforms",
    icon: Brain,
  },
  {
    title: "Real-time Metrics", 
    description: "Track engagement and sentiment changes as they happen",
    icon: BarChart3,
  },
  {
    title: "Smart Insights",
    description: "Get actionable recommendations based on your data",
    icon: Sparkles,
  },
  {
    title: "Quick Integration",
    description: "Connect your platforms in minutes, not hours",
    icon: Zap,
  },
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted URL:", url);
    setUrl("");
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        />
        <div className="absolute right-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl"
          style={{
            transform: `translate(${-mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      {/* Navbar */}
      <nav className="border-b backdrop-blur-md bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="flex flex-1">
            <Link href="/" className="font-semibold flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
              <span>Enbox</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient">
             Next-Gen Social Media Analytics
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto backdrop-blur-sm">
              Harness the power of AI to analyze sentiment across all your social platforms in real-time
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlowingCard
                  fromColor="#4158D0"
                  viaColor="#C850C0" 
                  toColor="#FFCC70"
                >
                  <CardHeader>
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <feature.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                    </motion.div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </GlowingCard>
              </motion.div>
            ))}
          </div>

          {/* Platforms Grid */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold mb-8"
          >
            Choose Your Platform
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {platforms.map((platform, index) => {
                const Icon = platform.icon;
                return (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Link href={`/dashboard/${platform.name.toLowerCase()}`}>
                      <Card className="hover:shadow-lg transition-all cursor-pointer group bg-gradient-to-br from-background/40 to-muted/40 backdrop-blur-md border-muted-foreground/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Icon
                              className="h-5 w-5 transition-all"
                              style={{
                                color: platform.color,
                                opacity: 0.8,
                              }}
                            />
                            <span className="group-hover:text-primary transition-colors">
                              {platform.name}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            View sentiment analysis and engagement metrics for {platform.name}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Custom Website Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: platforms.length * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Card className="hover:shadow-lg transition-all cursor-pointer group border-dashed bg-gradient-to-br from-background/40 to-muted/40 backdrop-blur-md border-muted-foreground/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Plus className="h-5 w-5" />
                        </motion.div>
                        <span className="group-hover:text-foreground/80">
                          Add Custom Website
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Add a custom website URL to analyze its sentiment and engagement
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] backdrop-blur-md bg-background/95">
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>Add Custom Website</DialogTitle>
                      <DialogDescription>
                        Enter the URL of the website you want to analyze. Make sure to include the full URL with http:// or https://.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="url">Website URL</Label>
                        <Input
                          id="url"
                          placeholder="https://example.com"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90">Add Website</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
