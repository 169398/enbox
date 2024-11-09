"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Platform, mockEngagementMetrics } from "@/lib/mock-data"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function EngagementMetrics({ platform }: { platform: Platform }) {
  const [metrics, setMetrics] = useState(mockEngagementMetrics)

  useEffect(() => {
    // Filter metrics by platform
    const filteredMetrics = mockEngagementMetrics
      .filter((metric) => metric.platform === platform)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)

    setMetrics(filteredMetrics)
  }, [platform])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Engagement Metrics</CardTitle>
      </CardHeader>
      <CardContent>
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
                <TableCell className="capitalize">{metric.feedbackSentiment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 