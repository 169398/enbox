"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Platform } from "@/lib/mock-data";

interface Message {
  role: "assistant" | "user";
  content: string;
  isStreaming?: boolean;
}

export function MiraChatbot({ platform }: { platform: Platform }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi there! I'm Mira, your personal assistant. How can I help you today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const streamResponse = async (response: string) => {
    const words = response.split(" ");
    let currentContent = "";
    
    // Add a streaming message
    setMessages(prev => [...prev, { role: "assistant", content: "", isStreaming: true }]);

    // Stream each word
    for (const word of words) {
      await new Promise(resolve => setTimeout(resolve, 50)); // Adjust speed here
      currentContent += word + " ";
      setMessages(prev => prev.map((msg, idx) => 
        idx === prev.length - 1 
          ? { ...msg, content: currentContent }
          : msg
      ));
    }

    // Remove streaming flag
    setMessages(prev => prev.map((msg, idx) => 
      idx === prev.length - 1 
        ? { ...msg, isStreaming: false }
        : msg
    ));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const simulateResponse = async (userMessage: string) => {
    setIsThinking(true);
    
    // Simulate thinking time (2-4 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    setIsThinking(false);

    const responses = {
      linkedin: "Based on the data I have from your profile, I recommend creating a thought leadership post about industry trends. Include data points and insights from your experience - you know, those fascinating numbers that make everyone go 'wow!' (or at least pretend to). Make sure to sprinkle in some real-world examples and maybe a dash of humble bragging - it is LinkedIn after all! The best time to post would be Tuesday or Wednesday between 9-11 AM when professional engagement is highest, probably because everyone's pretending to work while scrolling their feed. Pro tip: End with a thought-provoking question to boost engagement, like 'What are your thoughts?' (Works every time, trust me!). And don't forget to use those buzzwords like 'synergy' and 'paradigm shift' - LinkedIn folks eat that stuff up!",
      twitter: "For Twitter, keep your content concise and engaging. Use relevant hashtags and consider creating a poll to boost engagement. The ideal posting time is during commute hours (8-9 AM or 5-6 PM).",
    };

    const response = responses[platform.toLowerCase() as keyof typeof responses] || 
      "I recommend analyzing your audience engagement patterns and creating content that resonates with their interests.";

    await streamResponse(response);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    await simulateResponse(userMessage);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
      >
        <Bot className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-4 w-96 z-50"
          >
            <Card className="p-4 shadow-lg backdrop-blur-md bg-background/95">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Mira - AI Assistant</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="h-96 overflow-y-auto space-y-4 mb-4 pr-2">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      message.role === "assistant" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "assistant"
                          ? "bg-muted"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {message.content}
                      {message.isStreaming && (
                        <motion.span
                          animate={{ opacity: [0, 1] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                        >
                          ▊
                        </motion.span>
                      )}
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <motion.div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              delay: i * 0.2,
                            }}
                          >
                            •
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Mira anything..."
                  className="flex-1 rounded-md border bg-background px-3 py-2"
                />
                <Button type="submit" disabled={isThinking}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 