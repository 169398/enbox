export type Platform = "Twitter" | "LinkedIn" | "Facebook" | "Instagram" | "YouTube";

export type SentimentType = "positive" | "negative" | "neutral";

export interface Comment {
  id: string;
  content: string;
  sentimentScore: SentimentType;
  platform: Platform;
  timestamp: string;
}

export interface Topic {
  id: string;
  topicName: string;
  engagementScore: number;
  platform: Platform;
  timestamp: string;
}

export interface EngagementMetric {
  postId: string;
  timeSpent: number;
  readRate: number;
  socialShares: number;
  commentsCount: number;
  feedbackSentiment: SentimentType;
  platform: Platform;
  timestamp: string;
}

export const mockComments: Comment[] = [
  {
    id: "1",
    content: "Great article! Very informative",
    sentimentScore: "positive",
    platform: "LinkedIn",
    timestamp: new Date().toISOString()
  },
  // Add more mock comments...
];

export const mockTopics: Topic[] = [
  {
    id: "1",
    topicName: "AI in Media",
    engagementScore: 300,
    platform: "LinkedIn",
    timestamp: new Date().toISOString()
  },
  // Add more mock topics...
];

export const mockEngagementMetrics: EngagementMetric[] = [
  {
    postId: "1",
    timeSpent: 120,
    readRate: 78,
    socialShares: 40,
    commentsCount: 25,
    feedbackSentiment: "positive",
    platform: "LinkedIn",
    timestamp: new Date().toISOString()
  },
  // Add more mock metrics...
]; 