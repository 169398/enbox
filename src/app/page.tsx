import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Platform } from "@/lib/mock-data";
import Link from "next/link";
import {
  SiLinkedin,
  SiFacebook,
  SiInstagram,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { Twitter } from "lucide-react";
import { ModeToggle } from "@/components/themes/mode-toggle";

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

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="flex flex-1">
            <Link href="/" className="font-semibold">
              Sentiment Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Choose Platform to Analyze
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <Link
                key={platform.name}
                href={`/dashboard/${platform.name.toLowerCase()}`}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon
                        className="h-5 w-5 transition-colors"
                        style={{
                          color: platform.color,
                          opacity: 0.8,
                        }}
                      />
                      <span className="group-hover:text-foreground/80">
                        {platform.name}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      View sentiment analysis and engagement metrics for{" "}
                      {platform.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
