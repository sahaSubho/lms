"use client";

import { useState } from "react";
import CCText from "@/atom/CCText";
import CCButton from "@/atom/CCButton";
import { useUploadCourseBook } from "@/APIHooks/uploadCoursesApi";

const UploadBookForm = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [chapters, setChapters] = useState([{ title: "", file: null }]);
  const [loading, setLoading] = useState(false);

  const { uploadCourseBook, isLoading, error, success } = useUploadCourseBook();
  // Handle book title change
  const handleBookTitleChange = (e) => {
    setBookTitle(e.target.value);
  };

  // Handle chapter title change
  //   const handleChapterTitleChange = (index, value) => {
  //     const updatedChapters = [...chapters];
  //     updatedChapters[index].title = value;
  //     setChapters(updatedChapters);
  //   };

  // Handle file selection
  const handleFileChange = (index, file) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].file = file;
    setChapters(updatedChapters);
  };

  // Add a new chapter field
  const addChapter = () => {
    setChapters([...chapters, { title: "", file: null }]);
  };

  // Remove a chapter field
  const removeChapter = (index) => {
    const updatedChapters = chapters.filter((_, i) => i !== index);
    setChapters(updatedChapters);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookTitle.trim()) {
      alert("Book title is required!");
      return;
    }

    if (chapters.some((chap) => !chap.file)) {
      alert("Each chapter must have a title and a PGN file.");
      return;
    }

    const formData = new FormData();
    formData.append("book_title", bookTitle);

    chapters.forEach((chapter, index) => {
      //   formData.append(`chapter_title_${index}`, chapter.title);
      console.log("file", chapter.file);
      formData.append(`chapter_file_${index}`, chapter.file);
    });

    try {
      setLoading(true);
      await uploadCourseBook(formData);
      //   const response = await fetch("http://127.0.0.1:8000/api/upload-book/", {
      //     method: "POST",
      //     body: formData,
      //   });

      if (error) {
        throw new Error("Failed to upload book.");
      }

      alert("Book uploaded successfully!");
      setBookTitle("");
      setChapters([{ title: "", file: null }]);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <CCText className="text-2xl font-bold mb-6">Upload New Book</CCText>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Book Title */}
        <div>
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
        </div>

        {/* Chapters */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Chapters (Upload PGN file)
          </label>
          {chapters.map((chapter, index) => (
            <div key={index} className="flex items-center space-x-2 mb-3">
              <CCText>Chapter {index + 1}</CCText>
              <input
                type="file"
                accept=".pgn"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
                className="text-gray-500 border p-2 rounded-md"
                required
              />
              {chapters.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeChapter(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                >
                  ✖
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Chapter Button */}
        <CCButton
          buttonType="grey"
          onClick={addChapter}
          className="bg-brand-darkBrown text-white rounded-md"
        >
          Add Chapter
        </CCButton>

        {/* Submit Button */}
        <CCButton
          type="submit"
          buttonStyle="square"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Uploading..." : "Upload Book"}
        </CCButton>
      </form>
    </div>
  );
};

export default UploadBookForm;
