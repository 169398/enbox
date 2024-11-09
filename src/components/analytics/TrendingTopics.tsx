import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingTopic } from "@/types/analytics"

interface TrendingTopicsProps {
  topics: TrendingTopic[]
}

export function TrendingTopics({ topics }: TrendingTopicsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{topic.topic}</h3>
                <p className="text-sm text-muted-foreground">
                  {topic.volume.toLocaleString()} mentions
                </p>
              </div>
              <Badge variant={
                topic.sentiment === "positive" ? "default" :
                topic.sentiment === "negative" ? "destructive" :
                "secondary"
              }>
                {topic.change > 0 ? "+" : ""}{topic.change}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 