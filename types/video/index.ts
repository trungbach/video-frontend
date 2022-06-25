export interface Video {
  ownerId: number;
  title: string;
  content: string;
  time: number;
  rateAVG?: number;
  avatarId: number;
  fileId: number;
  videoQuestions: VideoQuestion[];
  feedbacks?: Feedback[];
}

export interface FeedbackRequest {
  videoId: number;
  rate: number;
  commnent: string;
}

export interface VideoQuestion {
  videoId: number;
  duration: number;
  type: VideoQuestionType;
  questionContent: string;
  questionData: string;
  answer: string;
}

export enum VideoQuestionType {
  MultiSelect,
  Explain,
}

export interface Feedback {
  videoId: number;
  ownerId: number;
  rate: number;
  comment: string;
}

export interface GetVideoRequest {
  page?: number;
  name?: string;
  type?: number;
  ownerId?: number;
}
export interface DeleleRequest {
  id: number;
}
export interface GetDetailRequest {
  videoId: number;
}

export interface ViewRequest {
  id: number;
}
