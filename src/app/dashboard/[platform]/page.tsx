"use client";

import { EngagementMetrics } from "@/components/dashboard/engagement-metrics";
import { SentimentOverview } from "@/components/dashboard/sentiment-overview";
import { TrendingTopics } from "@/components/dashboard/trending-topics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Platform } from "@/lib/mock-data";
import { use } from "react";

interface PageProps {
  params: Promise<{ platform: string }>;
}

export default function DashboardPage({ params }: PageProps) {
  const { platform } = use(params);
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{platformName} Analytics</h1>

      <Tabs defaultValue="sentiment">
        <TabsList>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="trending">Trending Topics</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="sentiment">
          <SentimentOverview platform={platform as Platform} />
        </TabsContent>

        <TabsContent value="trending">
          <TrendingTopics platform={platform as Platform} />
        </TabsContent>

        <TabsContent value="engagement">
          <EngagementMetrics platform={platform as Platform} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
