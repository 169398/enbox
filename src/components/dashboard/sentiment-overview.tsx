"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Platform, mockComments } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface SentimentStats {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

export function SentimentOverview({ platform }: { platform: Platform }) {
  const [stats, setStats] = useState<SentimentStats>({
    positive: 0,
    negative: 0,
    neutral: 0,
    total: 0,
  });

  useEffect(() => {
    // Filter comments by platform and calculate sentiment percentages
    const platformComments = mockComments.filter(
      (comment) => comment.platform === platform
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

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
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
  );
}
