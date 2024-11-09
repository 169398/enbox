"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Platform, mockTopics } from "@/lib/mock-data"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

export function TrendingTopics({ platform }: { platform: Platform }) {
  const [trendingTopics, setTrendingTopics] = useState(mockTopics)

  useEffect(() => {
    // Filter topics by platform and sort by engagement score
    const filteredTopics = mockTopics
      .filter((topic) => topic.platform === platform)
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, 5)

    setTrendingTopics(filteredTopics)
  }, [platform])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingTopics.map((topic, index) => (
            <div
              key={topic.id}
              className="flex items-center justify-between space-x-4"
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
              <Badge variant="secondary">
                {topic.engagementScore} engagements
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 