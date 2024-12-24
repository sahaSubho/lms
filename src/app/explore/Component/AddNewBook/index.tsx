"use client";

import { BookDetails } from "@/app/book/[bookKey]/types";
import CCButton from "@/atom/CCButton";
import CCInput from "@/atom/CCInput";
import CCText from "@/atom/CCText";
import React, { useState } from "react";

const AddNewBook: React.FC = () => {
  const [formData, setFormData] = useState<BookDetails>({
    title: "",
    author: "",
    price: 0,
    mrp: 0,
    rating: 0,
    badges: [],
    courseIncludes: [],
    WhatYouLearn: [],
    CourseContent: [],
    CourseRating: {
      avgRating: 0,
      allRating: [],
    },
    FAQContent: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Handle form submission logic, e.g., sending data to an API
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <CCText className="text-2xl font-bold mb-6">Upload New Book</CCText>

      {/* Title */}
      <div className="mb-4">
        <CCText
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </CCText>
        <CCInput
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Author */}
      <div className="mb-4">
        <CCText
          htmlFor="author"
          className="block text-sm font-medium text-gray-700"
        >
          Author
        </CCText>
        <CCInput
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <CCText
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </CCText>
        <CCInput
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* MRP */}
      <div className="mb-4">
        <CCText
          htmlFor="mrp"
          className="block text-sm font-medium text-gray-700"
        >
          MRP
        </CCText>
        <CCInput
          type="number"
          id="mrp"
          name="mrp"
          value={formData.mrp}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Rating */}
      <div className="mb-4">
        <CCText
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700"
        >
          Rating
        </CCText>
        <CCInput
          type="number"
          id="rating"
          name="rating"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Badges */}
      <div className="mb-4">
        <CCText
          htmlFor="badges"
          className="block text-sm font-medium text-gray-700"
        >
          Badges (comma-separated)
        </CCText>
        <CCInput
          type="text"
          id="badges"
          name="badges"
          value={formData.badges.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              badges: e.target.value.split(", ").map((badge) => badge.trim()),
            })
          }
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Submit Button */}
      <CCButton type="submit" buttonStyle="square" className="w-full">
        Submit
      </CCButton>
    </form>
  );
};

export default AddNewBook;
