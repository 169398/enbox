"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Platform, mockTopics } from "@/lib/mock-data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function TrendingTopics({ platform }: { platform: Platform }) {
  const [trendingTopics, setTrendingTopics] = useState(mockTopics);
  const [totalEngagement, setTotalEngagement] = useState(0);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const filteredTopics = mockTopics
      .filter(
        (topic) => topic.platform.toLowerCase() === platform.toLowerCase()
      )
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, 5);

    const total = filteredTopics.reduce(
      (sum, topic) => sum + topic.engagementScore,
      0
    );

    setTrendingTopics(filteredTopics);
    setTotalEngagement(total);
  }, [platform]);

  const chartData = trendingTopics.map((topic) => ({
    name: topic.topicName,
    engagements: topic.engagementScore,
  }));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalEngagement.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Trending Topics</CardTitle>
          <Button onClick={() => setShowChart(!showChart)}>
            {showChart ? "View List" : "View Chart"}
          </Button>
        </CardHeader>
        <CardContent>
          {showChart ? (
            <ChartContainer
              config={{
                engagements: {
                  label: "Engagements",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar
                    dataKey="engagements"
                    fill="var(--color-engagements)"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between space-x-4 p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="font-bold text-xl text-muted-foreground">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {topic.topicName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(topic.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    {topic.engagementScore.toLocaleString()} engagements
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
