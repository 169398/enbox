import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SentimentOverviewProps {
  positive: number
  negative: number
  neutral: number
}

export function SentimentOverview({ positive, negative, neutral }: SentimentOverviewProps) {
  const total = positive + negative + neutral
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comment Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span>Positive</span>
            <span className="text-green-500">{Math.round(positive/total * 100)}%</span>
          </div>
          <Progress value={positive/total * 100} className="bg-green-100" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span>Neutral</span>
            <span className="text-yellow-500">{Math.round(neutral/total * 100)}%</span>
          </div>
          <Progress value={neutral/total * 100} className="bg-yellow-100" />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span>Negative</span>
            <span className="text-red-500">{Math.round(negative/total * 100)}%</span>
          </div>
          <Progress value={negative/total * 100} className="bg-red-100" />
        </div>
      </CardContent>
    </Card>
  )
} 