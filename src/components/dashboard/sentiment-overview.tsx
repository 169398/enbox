"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Platform, mockComments } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SentimentStats {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

const COLORS = {
  positive: "hsl(var(--chart-1))",
  neutral: "hsl(var(--chart-2))",
  negative: "hsl(var(--chart-3))",
};

export function SentimentOverview({ platform }: { platform: Platform }) {
  const [stats, setStats] = useState<SentimentStats>({
    positive: 0,
    negative: 0,
    neutral: 0,
    total: 0,
  });

  useEffect(() => {
    const platformComments = mockComments.filter(
      (comment) => comment.platform.toLowerCase() === platform.toLowerCase()
    );

    const sentimentCounts = platformComments.reduce(
      (acc, comment) => {
        acc[comment.sentimentScore]++;
        return acc;
      },
      { positive: 0, negative: 0, neutral: 0 }
    );

    const total = platformComments.length;

    setStats({
      ...sentimentCounts,
      total,
    });
  }, [platform]);

  const getPercentage = (value: number) => {
    return stats.total ? (value / stats.total) * 100 : 0;
  };

  const pieChartData = [
    { name: "Positive", value: stats.positive },
    { name: "Neutral", value: stats.neutral },
    { name: "Negative", value: stats.negative },
  ];

  const barChartData = [
    { name: "Positive", value: stats.positive },
    { name: "Neutral", value: stats.neutral },
    { name: "Negative", value: stats.negative },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Responses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Positive Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-500">
                {getPercentage(stats.positive).toFixed(1)}%
              </div>
              <Progress
                value={getPercentage(stats.positive)}
                className="bg-muted"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Neutral Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-yellow-500">
                {getPercentage(stats.neutral).toFixed(1)}%
              </div>
              <Progress
                value={getPercentage(stats.neutral)}
                className="bg-muted"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Negative Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-red-500">
                {getPercentage(stats.negative).toFixed(1)}%
              </div>
              <Progress
                value={getPercentage(stats.negative)}
                className="bg-muted"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                positive: { label: "Positive", color: COLORS.positive },
                neutral: { label: "Neutral", color: COLORS.neutral },
                negative: { label: "Negative", color: COLORS.negative },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                            entry.name.toLowerCase() as keyof typeof COLORS
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentiment Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                positive: { label: "Positive", color: COLORS.positive },
                neutral: { label: "Neutral", color: COLORS.neutral },
                negative: { label: "Negative", color: COLORS.negative },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {barChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                            entry.name.toLowerCase() as keyof typeof COLORS
                          ]
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
