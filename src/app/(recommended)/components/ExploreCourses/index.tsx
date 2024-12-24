"use client";
import React, { useState } from "react";
import CourseCard from "@/components/CourseCard";
import CCText from "@/atom/CCText";
import CCInput from "@/atom/CCInput";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineFilter } from "react-icons/hi";
import CCModal from "@/atom/CCModal";
import CCAccordion from "@/atom/CCAccordion";
import Spacer from "@/atom/Spacer";
import { useRouter } from "next/navigation";
import { useGetAllCourses } from "@/APIHooks/AllCoursesApi/useGetAllCourses";
import CourseCardShimmer from "@/components/CourseCard/loading";

function ExploreCourses() {
  const [openFilter, setOpenFilter] = useState(false);
  const router = useRouter();
  const { data: courses, isLoading, error } = useGetAllCourses();

  const handleFilterOpen = () => {
    setOpenFilter((prev) => !prev);
  };

  const handleCourseClick = (courseKey: string) => {
    router.push(`/book/${courseKey}`);
  };

  if (error) return <CCText>Error loading courses: {error}</CCText>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <CCText className="flex-[0.6] text-lg font-medium">
          Explore Courses
        </CCText>
        <div className="flex flex-[0.3] gap-5">
          <CCInput icon={IoIosSearch} placeholder="Search a course" />
          <button
            onClick={handleFilterOpen}
            className="bg-white rounded-lg border border-1 border-dark-grey px-[16px] py-[12px]"
          >
            <HiOutlineFilter size={20} className="text-textColor-default" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-10">
        {isLoading && (
          <>
            <CourseCardShimmer />
            <CourseCardShimmer />
            <CourseCardShimmer />
            <CourseCardShimmer />
            <CourseCardShimmer />
            <CourseCardShimmer />
            <CourseCardShimmer />
          </>
        )}
        {courses
          ?.filter((i) => !i?.already_bought)
          ?.map((course) => (
            <CourseCard
              key={course?.courseKey}
              {...course}
              onClick={() => handleCourseClick(course.courseKey)}
            />
          ))}
      </div>

      <CCModal
        header="Filter by"
        isOpen={openFilter}
        onClose={handleFilterOpen}
        type="side"
      >
        <Spacer spacing={20} />
        <CCAccordion
          sections={[
            {
              heading: "Select Your Options - Section 1",
              options: [
                { label: "Option 1.1", value: "option1.1" },
                { label: "Option 1.2", value: "option1.2" },
                { label: "Option 1.3", value: "option1.3" },
              ],
            },
            {
              heading: "Select Your Options - Section 2",
              options: [
                { label: "Option 2.1", value: "option2.1" },
                { label: "Option 2.2", value: "option2.2" },
                { label: "Option 2.3", value: "option2.3" },
              ],
            },
            {
              heading: "Select Your Options - Section 3",
              options: [
                { label: "Option 3.1", value: "option3.1" },
                { label: "Option 3.2", value: "option3.2" },
                { label: "Option 3.3", value: "option3.3" },
              ],
            },
          ]}
        />
      </CCModal>
    </div>
  );
}

export default ExploreCourses;
