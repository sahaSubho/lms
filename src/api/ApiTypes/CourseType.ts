// types/course.ts
export interface Course {
  courseKey: string;
  title: string;
  author: string;
  chapters: number;
  timeLength: string;
  price: number;
  mrp: number;
  rating: number;
  badges: string[];
  createdAt: string;
}
