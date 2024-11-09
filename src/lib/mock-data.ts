import { ContentItem, TrendingTopic, EngagementMetric } from "@/types/analytics"

export const mockContentItems: ContentItem[] = [
  {
    id: "1",
    title: "Understanding AI in 2024",
    type: "article",
    sentiment: "positive",
    engagementRate: 78,
    views: 12500,
    shares: 450,
    comments: 230,
    likes: 890,
    publishedAt: "2024-03-15"
  },
  // Add more mock items...
]

export const mockTrendingTopics: TrendingTopic[] = [
  {
    id: "1",
    topic: "Artificial Intelligence",
    volume: 15000,
    sentiment: "positive",
    change: 23
  },
  // Add more mock topics...
]

export const mockEngagementData: EngagementMetric[] = [
  {
    date: "2024-03-01",
    views: 5000,
    likes: 300,
    shares: 150,
    comments: 80
  },
  // Add more mock data points...
] 