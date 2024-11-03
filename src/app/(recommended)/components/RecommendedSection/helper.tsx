// import {
//   FaChessKnight,
//   FaPuzzlePiece,
//   FaChessBoard,
//   FaChessKing,
//   FaCalculator,
// } from "react-icons/fa";

export const filterItems = [
  {
    id: 1,
    name: (
      <span className="flex justify-start items-center">
        {/* <FaChessKnight className="inline-block mr-2" /> */}
        Strategy (2)
      </span>
    ),
    key: 1,
  },
  {
    id: 2,
    name: (
      <span className="flex justify-start items-center">
        {/* <FaPuzzlePiece className="inline-block mr-2" /> */}
        Tactical Patterns (2)
      </span>
    ),
    key: 2,
  },
  {
    id: 3,
    name: (
      <span className="flex justify-start items-center">
        {/* <FaChessBoard className="inline-block mr-2" /> */}
        Opening (4)
      </span>
    ),
    key: 3,
  },
  {
    id: 4,
    name: (
      <span className="flex justify-start items-center">
        {/* <FaChessKing className="inline-block mr-2" /> */}
        Endgame (2)
      </span>
    ),
    key: 4,
  },
  {
    id: 5,
    name: (
      <span className="flex justify-start items-center">
        {/* <FaCalculator className="inline-block mr-2" /> */}
        Calculation (2)
      </span>
    ),
    key: 5,
  },
];
export const learningCourses = [
  {
    id: 1,
    title: "Improve your Opening game play by 20%",
    booksCount: 15,
    puzzlesCount: 15,
    studentsCount: 15,
    videosCount: 15,
    chaptersCount: 15,
    badges: ["lifetime-access", "verified-circlechess"],
    price: 299,
    percentageDetails: { from: 5.9, to: 26 },
    // percentageDetails: { from: number, to: number },
  },
  {
    id: 1,
    title: "Improve your Opening game play by 20%",
    booksCount: 15,
    puzzlesCount: 15,
    studentsCount: 15,
    videosCount: 15,
    chaptersCount: 15,
    badges: ["lifetime-access", "verified-circlechess"],
    price: 299,
    percentageDetails: { from: 40, to: 60 },
    // percentageDetails: { from: number, to: number },
  },
  {
    id: 1,
    title: "Improve your Opening game play by 20%",
    booksCount: 15,
    puzzlesCount: 15,
    studentsCount: 15,
    videosCount: 15,
    chaptersCount: 15,
    badges: ["lifetime-access", "verified-circlechess"],
    price: 299,
    percentageDetails: { from: 60, to: 80 },
    // percentageDetails: { from: number, to: number },
  },
];
