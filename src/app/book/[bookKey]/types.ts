import { StaticImageData } from "next/image";

export type IconType = string | StaticImageData;

export interface CourseInclude {
  id: number;
  icon: IconType;
  description: string;
}

export interface chapterDetails {
  id: number;
  title: string;
  subTitle: string;
  time: number;
}

export interface CourseContent {
  id: number;
  day: number;
  chapters: chapterDetails[];
}

export interface CourseRatingItem {
  id: number;
  name: string;
  rating: number;
  reviewMessage: string;
  createdAt: string;
  img?: string;
}

export interface CourseRating {
  avgRating: number;
  allRating: CourseRatingItem[];
}

export interface faq {
  id: number;
  question: string;
  answer: string;
}

export interface BookDetails {
  title: string;
  author: string;
  price: number;
  mrp: number;
  rating: number;
  badges: string[];
  courseIncludes: CourseInclude[];
  WhatYouLearn: string[];
  CourseContent: CourseContent[];
  CourseRating: CourseRating;
  FAQContent: faq[];
}
