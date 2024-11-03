// app/books/[bookKey]/page.tsx
"use client";

import CCText from "@/atom/CCText";
import CourseCard from "@/components/CourseCard";
import { useParams } from "next/navigation";
import React from "react";
import { bookDetails } from "./helper";
import { LiaBookMedicalSolid } from "react-icons/lia";
import CCCard from "@/atom/CCCard";
import Spacer from "@/atom/Spacer";
import Image from "next/image";
import DynamicIcon from "@/utils/DynamicIcon";
import CourseIncludes from "./Component/CourseIncludes";
import WhatYouLearn from "./Component/WhatYouLearn";
import CourseContent from "./Component/CourseContent";
import CourseRating from "./Component/CourseRating";
import FAQContent from "./Component/FAQContent";

const BookPage = () => {
  const params = useParams();
  const { bookKey } = params; // Extract the dynamic parameter

  return (
    <div className="p-6 flex justify-between items-start gap-4">
      <div className="flex-[0.26]">
        {/* @ts-ignore */}
        <CourseCard {...bookDetails} cardClassName="bg-white" />
      </div>
      <div className="flex-[0.74] flex-col justify-start items-start ">
        <CourseIncludes bookDetails={bookDetails} />
        <WhatYouLearn bookDetails={bookDetails} />
        <CourseContent bookDetails={bookDetails} />
        <CourseRating bookDetails={bookDetails} />
        <FAQContent bookDetails={bookDetails} />
      </div>
    </div>
  );
};

export default BookPage;
