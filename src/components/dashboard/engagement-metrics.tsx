"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Platform, mockEngagementMetrics, mockComments } from "@/lib/mock-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

import { Lightbulb } from "lucide-react";

interface CommentModalProps {
  platform: Platform;
}

function CommentModal({ platform }: CommentModalProps) {
  const [selectedTab, setSelectedTab] = useState("positive");
  
  const filteredComments = mockComments.filter(
    (comment) => 
      comment.platform.toLowerCase() === platform.toLowerCase() &&
      comment.sentimentScore === selectedTab
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Comments</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Comments Analysis</DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue="positive"
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="positive" className="flex gap-2">
              Positive
              <Badge variant="success">
                {mockComments.filter(
                  (c) => 
                    c.platform.toLowerCase() === platform.toLowerCase() &&
                    c.sentimentScore === "positive"
                ).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="neutral" className="flex gap-2">
              Neutral
              <Badge variant="neutral">
                {mockComments.filter(
                  (c) => 
                    c.platform.toLowerCase() === platform.toLowerCase() &&
                    c.sentimentScore === "neutral"
                ).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="negative" className="flex gap-2">
              Negative
              <Badge variant="destructive">
                {mockComments.filter(
                  (c) => 
                    c.platform.toLowerCase() === platform.toLowerCase() &&
                    c.sentimentScore === "negative"
                ).length}
              </Badge>
            </TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[400px] mt-4">
            <div className="space-y-4 p-4">
              {filteredComments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="pt-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm">{comment.content}</p>
                      <div className="flex justify-between items-center">
                        <Badge
                          variant={
                            comment.sentimentScore === "positive"
                              ? "success"
                              : comment.sentimentScore === "negative"
                              ? "destructive"
                              : "neutral"
                          }
                        >
                          {comment.sentimentScore}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredComments.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No {selectedTab} comments found
                </div>
              )}
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function getLinkedInAdvice() {
  return [
    {
      title: "Engagement Optimization",
      description: "Your content receives highest engagement between 9 AM - 11 AM. Consider posting during these peak hours for maximum visibility.",
    },
    {
      title: "Content Strategy",
      description: "Posts about industry insights and professional development receive 45% more engagement. Focus on creating more thought leadership content.",
    },
    {
      title: "Audience Interaction",
      description: "Users spend 20% more time on posts with rich media. Include more infographics and videos in your content strategy.",
    },
    {
      title: "Growth Opportunities",
      description: "Your positive sentiment rate is 85%. Leverage this by encouraging more user testimonials and success stories.",
    },
  ];
}

function AdviceModal({ platform }: { platform: Platform }) {
  const [open, setOpen] = useState(false);
  const advice = platform.toLowerCase() === "linkedin" ? getLinkedInAdvice() : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Lightbulb className="h-4 w-4" />
          Get Insights
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Platform Insights & Recommendations</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {advice.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function EngagementMetrics({ platform }: { platform: Platform }) {
  const [metrics, setMetrics] = useState(mockEngagementMetrics);
  const [summary, setSummary] = useState({
    avgTimeSpent: 0,
    avgReadRate: 0,
    totalShares: 0,
    totalComments: 0,
  });
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const filteredMetrics = mockEngagementMetrics
      .filter(
        (metric) => metric.platform.toLowerCase() === platform.toLowerCase()
      )
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 10);

    const calcSummary = filteredMetrics.reduce(
      (acc, metric) => ({
        avgTimeSpent: acc.avgTimeSpent + metric.timeSpent,
        avgReadRate: acc.avgReadRate + metric.readRate,
        totalShares: acc.totalShares + metric.socialShares,
        totalComments: acc.totalComments + metric.commentsCount,
      }),
      { avgTimeSpent: 0, avgReadRate: 0, totalShares: 0, totalComments: 0 }
    );

    if (filteredMetrics.length > 0) {
      calcSummary.avgTimeSpent = Math.round(
        calcSummary.avgTimeSpent / filteredMetrics.length
      );
      calcSummary.avgReadRate = Math.round(
        calcSummary.avgReadRate / filteredMetrics.length
      );
    }

    setMetrics(filteredMetrics);
    setSummary(calcSummary);
  }, [platform]);

  const chartData = metrics
    .map((metric) => ({
      date: new Date(metric.timestamp).toLocaleDateString(),
      timeSpent: metric.timeSpent,
      readRate: metric.readRate,
      shares: metric.socialShares,
      comments: metric.commentsCount,
    }))
    .reverse();

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <AdviceModal platform={platform} />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Avg Time Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.avgTimeSpent}s</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Avg Read Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.avgReadRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalShares}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Comments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">{summary.totalComments}</div>
            <CommentModal platform={platform} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Engagement Metrics</CardTitle>
          <Button onClick={() => setShowChart(!showChart)}>
            {showChart ? "View Table" : "View Chart"}
          </Button>
        </CardHeader>
        <CardContent>
          {showChart ? (
            <ChartContainer
              config={{
                timeSpent: {
                  label: "Time Spent",
                  color: "hsl(var(--chart-1))",
                },
                readRate: { label: "Read Rate", color: "hsl(var(--chart-2))" },
                shares: { label: "Shares", color: "hsl(var(--chart-3))" },
                comments: { label: "Comments", color: "hsl(var(--chart-4))" },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar
                    dataKey="timeSpent"
                    yAxisId="left"
                    fill="var(--color-timeSpent)"
                  />
                  <Line
                    type="monotone"
                    dataKey="readRate"
                    yAxisId="right"
                    stroke="var(--color-readRate)"
                  />
                  <Bar
                    dataKey="shares"
                    yAxisId="left"
                    fill="var(--color-shares)"
                  />
                  <Bar
                    dataKey="comments"
                    yAxisId="left"
                    fill="var(--color-comments)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time Spent (s)</TableHead>
                  <TableHead>Read Rate</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Sentiment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metrics.map((metric) => (
                  <TableRow key={metric.postId}>
                    <TableCell>
                      {new Date(metric.timestamp).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{metric.timeSpent}</TableCell>
                    <TableCell>{metric.readRate}%</TableCell>
                    <TableCell>{metric.socialShares}</TableCell>
                    <TableCell>{metric.commentsCount}</TableCell>
                    <TableCell className="capitalize">
                      {metric.feedbackSentiment}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
