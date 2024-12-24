"use client";

import CourseCard from "@/components/CourseCard";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import CourseIncludes from "./Component/CourseIncludes";
import WhatYouLearn from "./Component/WhatYouLearn";
import CourseContent from "./Component/CourseContent";
import CourseRating from "./Component/CourseRating";
import FAQContent from "./Component/FAQContent";
import { useGetCourseDetails } from "@/APIHooks/GetCourseDetails/useGetCourseDetails";
import { useRegisterCourse } from "@/APIHooks/RegisterCourseApi/useRegisterCourseApi";
import CCText from "@/atom/CCText";

const BookPage = () => {
  const { bookKey } = useParams();
  const router = useRouter();
  const { data: bookDetails, isLoading, error } = useGetCourseDetails(bookKey);
  const {
    registerCourse,
    isLoading: registerCourseLoading,
    error: registerCourseError,
    success: registerCourseSuccess,
  } = useRegisterCourse();

  useEffect(() => {
    if (registerCourseSuccess) {
      alert("Book bought successfully");
      router.push(`/`);
      // window.location.reload();
    }
  }, [registerCourseSuccess]);

  const buyCourse = (courseKey: string, alreadyBought) => {
    if (alreadyBought) {
      router.push(`/learning/${courseKey}`);
      return;
    }
    const confirmBuy = confirm("Are you sure you wan to buy this book?");
    if (confirmBuy) {
      registerCourse(courseKey);
    }
  };
  if (isLoading) return <CCText>Loading book details...</CCText>;
  if (error) return <CCText>Error loading book details: {error}</CCText>;

  return (
    <div className="p-6 flex justify-between items-start gap-4">
      <div className="flex-[0.26]">
        <CourseCard
          {...bookDetails}
          alreadyBought={bookDetails?.already_bought}
          courseKey={bookDetails?.course_key}
          chapters={bookDetails?.chapters?.length}
          cardClassName="bg-white"
          handleBuy={buyCourse}
        />
      </div>
      <div className="flex-[0.74] flex-col justify-start items-start ">
        <CourseIncludes bookDetails={bookDetails} />
        <WhatYouLearn bookDetails={bookDetails} />
        <CourseContent bookDetails={bookDetails} isCoursePage />
        <CourseRating bookDetails={bookDetails} />
        <FAQContent bookDetails={bookDetails} />
      </div>
    </div>
  );
};

export default BookPage;
function useGetBookDetails(bookKey: string | string[]): {
  data: any;
  isLoading: any;
  error: any;
} {
  throw new Error("Function not implemented.");
}
