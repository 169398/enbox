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
    content: "Great article! Very informative.",
    sentimentScore: "positive",
    platform: "LinkedIn",
    timestamp: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    content: "I disagree with some points here.",
    sentimentScore: "negative",
    platform: "Twitter",
    timestamp: "2024-03-15T09:30:00Z",
  },
  {
    id: "3",
    content: "This is a game changer!",
    sentimentScore: "positive",
    platform: "LinkedIn",
    timestamp: "2024-03-15T08:45:00Z",
  },
  {
    id: "4",
    content: "Not what I expected.",
    sentimentScore: "negative",
    platform: "Facebook",
    timestamp: "2024-03-15T08:00:00Z",
  },
  {
    id: "5",
    content: "Interesting perspective.",
    sentimentScore: "neutral",
    platform: "Twitter",
    timestamp: "2024-03-15T07:30:00Z",
  },
  // Add more comments for each platform
];

export const mockTopics: Topic[] = [
  {
    id: "1",
    topicName: "AI in Healthcare",
    engagementScore: 850,
    platform: "LinkedIn",
    timestamp: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    topicName: "Web Development Trends",
    engagementScore: 750,
    platform: "Twitter",
    timestamp: "2024-03-15T09:30:00Z",
  },
  {
    id: "3",
    topicName: "Remote Work Culture",
    engagementScore: 650,
    platform: "LinkedIn",
    timestamp: "2024-03-15T09:00:00Z",
  },
  {
    id: "4",
    topicName: "Digital Marketing",
    engagementScore: 550,
    platform: "Facebook",
    timestamp: "2024-03-15T08:30:00Z",
  },
  {
    id: "5",
    topicName: "Startup Innovation",
    engagementScore: 450,
    platform: "Twitter",
    timestamp: "2024-03-15T08:00:00Z",
  },
];

export const mockEngagementMetrics: EngagementMetric[] = [
  {
    postId: "1",
    timeSpent: 180,
    readRate: 85,
    socialShares: 45,
    commentsCount: 23,
    feedbackSentiment: "positive",
    platform: "LinkedIn",
    timestamp: "2024-03-15T10:00:00Z",
  },
  {
    postId: "2",
    timeSpent: 150,
    readRate: 75,
    socialShares: 35,
    commentsCount: 18,
    feedbackSentiment: "neutral",
    platform: "Twitter",
    timestamp: "2024-03-15T09:30:00Z",
  },
  {
    postId: "3",
    timeSpent: 120,
    readRate: 65,
    socialShares: 25,
    commentsCount: 12,
    feedbackSentiment: "positive",
    platform: "Facebook",
    timestamp: "2024-03-15T09:00:00Z",
  },
  {
    postId: "4",
    timeSpent: 90,
    readRate: 55,
    socialShares: 15,
    commentsCount: 8,
    feedbackSentiment: "negative",
    platform: "Instagram",
    timestamp: "2024-03-15T08:30:00Z",
  },
  {
    postId: "5",
    timeSpent: 60,
    readRate: 45,
    socialShares: 10,
    commentsCount: 5,
    feedbackSentiment: "neutral",
    platform: "YouTube",
    timestamp: "2024-03-15T08:00:00Z",
  },
];
