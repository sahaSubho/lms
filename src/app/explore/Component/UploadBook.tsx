"use client";

import { useEffect, useState } from "react";
import CCText from "@/atom/CCText";
import CCButton from "@/atom/CCButton";
import { useUploadCourseBook } from "@/APIHooks/uploadCoursesApi";
import ChapterForm from "./ChapterForm";
import { GetUserCourseLearning } from "@/APIHooks/GetUserCourseLearning/GetUserCourseLearning";
import CCDivider from "@/atom/CCDivider";
import { TiDelete } from "react-icons/ti";

type Chapter = {
  index: number;
  id?: number;
  title: string;
  pages: any[];
};
let chapterId = 0;
const UploadBookForm = () => {
  const [courseKey, setCourseKey] = useState<string>('');
  const { data: learningData, } = GetUserCourseLearning(courseKey);
  const [bookTitle, setBookTitle] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([
    { index: 0, title: "", pages: [] },
  ]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(
    chapters[0]
  );

  useEffect(() => {
    const courseKey = localStorage.getItem("courseKey") || "";
    setCourseKey(courseKey);
  }, []);

  useEffect(() => {
    if (learningData) {
      setChapters(learningData.chapters.map((chapter, index) => ({
        id: chapter.id,
        index,
        title: chapter.title,
        pages: chapter.pages,
      })));
      chapterId = learningData.chapters.length - 1; 
      if (learningData.chapters.length)
        setSelectedChapter({
          index: 0,
          id: learningData.chapters[0].id,
          title: learningData.chapters[0].title,
          pages: learningData.chapters[0].pages,
        });
    }
  }, [learningData]);

  const { uploadCourseBook, error } = useUploadCourseBook();
  // Handle book title change
  const handleBookTitleChange = (e: { target: { value: string } }) => {
    setBookTitle(e.target.value);
  };

  const submitChapter = (chapterData: Chapter, chapterId?: number) => {
    const updatedChapters = chapters.map((chapter, index) => {
      if (index === chapterId) {
        return chapterData;
      }
      return chapter;
    });
    setSubmitted(true);
    setChapters(updatedChapters);
  };
  // Add a new chapter field
  const addChapter = () => {
    chapterId += 1;
    setChapters([...chapters, { index: chapterId, title: "", pages: [] }]);
    setSelectedChapter({ index: chapterId, title: "", pages: [] });
  };

  // Remove a chapter field
  const removeChapter = (index: number) => {
    const updatedChapters = chapters.filter((_, i) => i !== index);
    setChapters(updatedChapters);
  };

  // Handle form submission
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // if (!bookTitle.trim()) {
    //   alert("Book title is required!");
    //   return;
    // }

    if (!chapters.length) {
      alert("chapter must have content.");
      return;
    }

    const formData = new FormData();
    formData.append("courseKey", courseKey || "");
    formData.append(`chapters`, JSON.stringify(chapters));
    chapters.forEach((chapter, index) => {
      chapter.pages.forEach((page, pageIndex) => {
        if (page.pgn instanceof File)
          formData.append(`chapter_${index}_page_${pageIndex}`, page.pgn);
      });
    });

    try {
      setLoading(true);
      await uploadCourseBook(formData);
      if (error) {
        throw new Error("Failed to upload book.");
      }

      alert("Book uploaded successfully!");
      setBookTitle("");
      setChapters([]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  console.log(chapters, selectedChapter);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <CCText className="text-2xl font-bold mb-6">Upload Chapter</CCText>
      {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
      {/* Book Title */}
      {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Book Title
          </label>
          <input
            type="text"
            value={bookTitle}
            onChange={handleBookTitleChange}
            className="mt-1 text-gray-700 w-full border p-2 rounded-md"
            required
          />
        </div> */}

      {/* Chapters */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Chapters
          </label>
          <CCButton
            buttonType="grey"
            onClick={addChapter}
            className="bg-brand-darkBrown text-white rounded-md"
          >
            Add Chapter
          </CCButton>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {selectedChapter && chapters.map((chapter, index) => (
            <CCButton
              className="relative"
              buttonStyle="square"
              onClick={() => setSelectedChapter(chapter)}
              key={chapter.index}
              textColor={selectedChapter.index === chapter.index ? "white" : "black"}
              buttonType={
                selectedChapter.index === chapter.index ? "darkBrown" : "grey"
              }
            >
              <div>
                Chapter {String(index + 1)}
                {index > 0 && (
                <div className="absolute -right-2 -top-2">
                  <TiDelete
                    color="red"
                    fontSize={20}
                    onClick={() => removeChapter(index)}
                  />
                </div>)}
              </div>
            </CCButton>
          ))}
        </div>
        <CCDivider className="my-8" />
        {selectedChapter && (
          <ChapterForm
            data={selectedChapter}
            chapterIndex={selectedChapter?.index}
            submitChapter={submitChapter}
          />
        )}
      </div>

      {/* Submit Button */}
      <CCButton
        disable={!submitted}
        buttonStyle="square"
        className="w-full"
        onClick={(e) => handleSubmit(e as React.MouseEvent<HTMLButtonElement>)}
      >
        {loading ? "Updating..." : "Update"}
      </CCButton>
      {/* </form> */}
    </div>
  );
};

export default UploadBookForm;
