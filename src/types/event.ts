import { Moment } from "moment";

export type EventType = {
  id: number;
  title: string;
  schedule: string;
  updated_at: string | Moment;
  sessions: SessionType[] | [];
};

export type SessionType = {
  id: number;
  title: string;
  order: number;
  lessons: LessonType[] | [];
};

export type LessonType = {
  id: number;
  type: "online" | "offline";
  order: number;
  title: string;
  required: boolean;
  previewable: boolean;
  date: string;
  duration: string;
  downloadble: boolean;
};
