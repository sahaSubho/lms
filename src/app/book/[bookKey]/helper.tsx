import CCCurrency from "@/assets/currency/cc-coin-currency.svg";
import { BookDetails } from "./types";

export const bookDetails: BookDetails = {
  title:
    "Beginner Mistakes and How to Avoid Them: TheBeginner Mistakes and How to Avoid Them: The",
  author: "GM Swapnil Dhopade",
  price: 1000,
  mrp: 1250,
  rating: 3.5,
  badges: ["lifetime-access", "verified-circlechess"],
  courseIncludes: [
    { id: 1, icon: "lu/LuPlayCircle", description: "6 hours on-demand video" },
    { id: 2, icon: "lu/LuBookCopy", description: "25 chapters" },
    { id: 3, icon: "lu/LuPuzzle", description: "25 top level puzzles" },
    { id: 4, icon: CCCurrency, description: "Earn 200 CC points" }, // SVG icon
    { id: 5, icon: "pi/PiNotePencilDuotone", description: "Practice Test" },
    {
      id: 6,
      icon: "lia/LiaMobileSolid",
      description: "Access on Mobile and Computer",
    },
  ],
  WhatYouLearn: [
    "Learn advanced Python features, like the collections module and how to work.",
    "Learn advanced Python features, like the collections module and how to work.",
    "Learn advanced Python features, like the collections module and how to work.",
    "Learn advanced Python features, like the collections module and how to work.",
    "Learn advanced Python features, like the collections module and how to work.",
    "Learn advanced Python features, like the collections module and how to work.",
    "Learn advanced Python features, like the collections module and how to work.",
    "Learn advanced Python features, like the collections module and how to work.",
  ],
  CourseContent: [
    {
      id: 1,
      day: 1,
      chapters: [
        {
          id: 1,
          title: "Chapter 1 - 1001 Chess Exercises for Beginners",
          subTitle: "The routes of the pieces?",
          time: 91,
        },
        {
          id: 2,
          title: "Chapter 2 - 1001 Chess Exercises for Beginners",
          subTitle: "The routes of the pieces?",
          time: 91,
        },
      ],
    },
    {
      id: 2,
      day: 2,
      chapters: [
        {
          id: 1,
          title: "Chapter 1 - 1001 Chess Exercises for Beginners",
          subTitle: "The routes of the pieces?",
          time: 91,
        },
      ],
    },
    {
      id: 3,
      day: 3,
      chapters: [
        {
          id: 1,
          title: "Chapter 1 - 1001 Chess Exercises for Beginners",
          subTitle: "The routes of the pieces?",
          time: 91,
        },
      ],
    },
    {
      id: 4,
      day: 4,
      chapters: [
        {
          id: 1,
          title: "Chapter 1 - 1001 Chess Exercises for Beginners",
          subTitle: "The routes of the pieces?",
          time: 91,
        },
      ],
    },
    {
      id: 5,
      day: 5,
      chapters: [
        {
          id: 1,
          title: "Chapter 1 - 1001 Chess Exercises for Beginners",
          subTitle: "The routes of the pieces?",
          time: 91,
        },
      ],
    },
  ],
  CourseRating: {
    avgRating: 4.6,
    allRating: [
      {
        id: 1,
        name: "Dinesh Kumar",
        rating: 5,
        reviewMessage:
          "My child's chess skills have improved dramatically, and the platform's user-friendly interface makes learning fun for them. It's a win-win!",
        createdAt: "2024-10-20 12:30:00",
        img: "https://fastly.picsum.photos/id/354/200/300.jpg?hmac=uSugRpT0q_Wj5xaWBDbBXW21Q__wsvMB58L9pjItvRQ",
      },
      {
        id: 2,
        name: "Saumitra Tiwari",
        rating: 3.5,
        reviewMessage:
          "My child's chess skills have improved dramatically, and the platform's user-friendly interface makes learning fun for them. It's a win-win!",
        createdAt: "2024-09-20 12:30:00",
      },
      {
        id: 3,
        name: "Dinesh Kumar",
        rating: 1.5,
        reviewMessage:
          "My child's chess skills have improved dramatically, and the platform's user-friendly interface makes learning fun for them. It's a win-win!",
        createdAt: "2020-10-20 12:30:00",
      },
    ],
  },
  FAQContent: [
    {
      id: 1,
      question: "How long does it take to complete a book?",
      answer:
        "consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus.",
    },
    {
      id: 2,
      question: "Can I take more than one book at a time?",
      answer:
        "consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus.",
    },
    {
      id: 3,
      question: "Will this book be available for a lifetime after purchase?",
      answer:
        "consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus.",
    },
  ],
};
