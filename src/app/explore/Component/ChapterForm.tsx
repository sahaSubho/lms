import { useEffect, useState } from "react";
import Input from "@/atom/CCInput";
import Button from "@/atom/CCButton";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import dynamic from "next/dynamic";
import WhiteCoin from "@/assets/ChessPieces/White-Coin.svg";
import WhiteFlag from "@/assets/ChessPieces/White-Flag.svg";
import Image from "next/image";
import { MdDragIndicator, MdAddCircle } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";

type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

type Page = {
  heading: string;
  content_type: string;
  text?: string;
  custom_pieces: { [key: string]: string };
  points: number;
  mcq?: MCQ;
  pgn?: File;
  pgn_text?: string;
  coins: string[];
  flag: string;
};

type Chapter = {
  index: number;
  id?: number;
  title: string;
  pages: Page[];
};

const RichTextEditor = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Spacer from "@/atom/Spacer";
import CCDivider from "@/atom/CCDivider";

export default function ChapterForm({
  data,
  chapterIndex,
  submitChapter,
}: {
  data: Chapter;
  chapterIndex: number;
  submitChapter: (chapterData: Chapter, chapterId?: number) => void;
}) {
  const [sortingEnabled, setSortingEnabled] = useState(false);
  const [formData, setFormData] = useState<Chapter>({
    index: 0,
    title: "",
    pages: [
      {
        heading: "",
        content_type: "",
        custom_pieces: {},
        points: 0,
        pgn: new File([""], ""),
        coins: [],
        flag: "",
      },
    ],
  });

  const resetForm = () => {
    setFormData({
      index: 0,
      title: "",
      pages: [
        {
          heading: "",
          content_type: "",
          custom_pieces: {},
          points: 0,
          pgn: new File([""], ""),
          coins: [],
          flag: "",
        },
      ],
    });
  };

  useEffect(() => {
    if (data) {
      resetForm();
      setTimeout(() => {
        const formdata: Chapter = data;
        formdata.pages = formdata.pages.map((page) => {
          if (page.custom_pieces) {
            console.log("custom_pieces", page.custom_pieces);
            const coins: string[] = [];
            let flag = "";
            Object.keys(page?.custom_pieces).forEach((cp) => {
              if (page?.custom_pieces[cp] === "wF") {
                flag = cp;
              } else {
                coins.push(cp);
              }
            });
            return {
              ...page,
              flag: flag,
              coins: coins,
            };
          }
          return page;
        });
        setFormData(data);
      }, 300);
    }
  }, [data]);

  // const [coins, setCoins] = useState<{ number : string[]}>();

  const handleChange = <K extends keyof Page>(
    index: number,
    key: K,
    value: Page[K]
  ) => {
    const newPages = [...formData.pages];
    newPages[index][key] = value;
    setFormData({ ...formData, pages: newPages });
  };

  const handleTextChange = (index: number, content: string) => {
    const newPages = [...formData.pages];
    newPages[index].text = content;
    setFormData({ ...formData, pages: newPages });
  };

  const addPage = () => {
    setFormData({
      ...formData,
      pages: [
        ...formData.pages,
        {
          heading: "",
          content_type: "",
          text: "",
          custom_pieces: {},
          points: 0,
          pgn: new File([""], ""),
          coins: [],
          flag: "",
        },
      ],
    });
  };

  const addMCQ = (index: number) => {
    const newPages = [...formData.pages];
    newPages[index].mcq = {
      question: "",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      answer: "",
    };
    setFormData({ ...formData, pages: newPages });
  };

  const removeMCQ = (index: number) => {
    const newPages = [...formData.pages];
    delete newPages[index].mcq;
    setFormData({ ...formData, pages: newPages });
  };

  const handleMCQChange = (
    pageIndex: number,
    key: keyof MCQ,
    value: string,
    optionIndex?: number
  ) => {
    const newPages = [...formData.pages];
    if (key === "options" && optionIndex !== undefined) {
      if (
        newPages[pageIndex].mcq &&
        Array.isArray(newPages[pageIndex].mcq[key])
      ) {
        newPages[pageIndex].mcq[key][optionIndex] = value;
      }
    } else if (key !== "options" && typeof value === "string") {
      if (newPages[pageIndex].mcq) {
        newPages[pageIndex].mcq[key] = value;
      }
    }
    setFormData({ ...formData, pages: newPages });
  };

  // Handle file selection
  const handleFileChange = (index: number, file: File) => {
    const newPages = [...formData.pages];
    newPages[index].pgn = file;
    setFormData({ ...formData, pages: newPages });
  };

  const handleDragEnd = (event: DragEndEvent, pageIndex: number) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const newPages = [...formData.pages];
      const options = newPages[pageIndex].mcq?.options || [];
      const oldIndex = options.indexOf(active.id as string);
      const newIndex = options.indexOf(over.id as string);
      if (newPages[pageIndex].mcq?.options) {
        newPages[pageIndex].mcq.options = arrayMove(
          options,
          oldIndex,
          newIndex
        );
      }
      setFormData({ ...formData, pages: newPages });
    }
  };

  const handlePageCoins = (index: number, coins: string[]) => {
    const newPages = [...formData.pages];
    newPages[index].coins = coins;
    const customPiecesObject: { [key: string]: string } = {};
    coins.forEach((coin) => {
      customPiecesObject[coin] = "wC";
    });
    if (newPages[index].flag) {
      customPiecesObject[newPages[index].flag] = "wF";
      newPages[index].custom_pieces = customPiecesObject;
    }
    setFormData({ ...formData, pages: newPages });
  };

  const handleCustomPiecesChange = (index: number, value: string) => {
    const newPages = [...formData.pages];
    if (/^[a-h]{1}[1-8]{0,1}$/g.test(value) || value === "") {
      const customPiecesObject: { [key: string]: string } = {};
      newPages[index]?.coins.forEach((coin) => {
        customPiecesObject[coin] = "wC";
      });
      if (value.length === 2) {
        customPiecesObject[value] = "wF";
        newPages[index].custom_pieces = customPiecesObject;
        newPages[index].flag = value;
      } else {
        newPages[index].flag = value;
      }
      setFormData({ ...formData, pages: newPages });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitChapter(formData, chapterIndex);
  };

  return (
    <div className="w-full mx-auto p-1 bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
          }}
        />
        {formData.pages.map((page, pageIndex) => (
          <div key={pageIndex} className="relative rounded-lg">
            <div className="flex mb-4 items-center justify-between">
              <h3 className="text-lg text-textColor-default font-bold">
                Page {pageIndex + 1}
              </h3>
              <FaMinusCircle
                color="red"
                fontSize={20}
                className="cursor-pointer"
                onClick={() => {
                  const newPages = formData.pages.filter(
                    (_, i) => i !== pageIndex
                  );
                  setFormData({ ...formData, pages: newPages });
                }}
              />
            </div>
            <Input
              name="page"
              placeholder="Page title"
              value={page.heading}
              onChange={(e) =>
                handleChange(pageIndex, "heading", e.target.value)
              }
            />
            <Spacer spacing={10} />
            <div>
              <label className="block text-textColor-default font-medium">
                Content Type:
              </label>
              {[
                { label: "Chess Positions", value: "chess_position" },
                { label: "Image", value: "img" },
                { label: "Video", value: "video" },
              ].map((type) => (
                <label
                  key={type.value}
                  className="inline-flex items-center mr-4"
                >
                  <input
                    type="radio"
                    name={`${pageIndex}_content_type`}
                    value={type.value}
                    checked={page.content_type === type.value}
                    onChange={(e) =>
                      handleChange(pageIndex, "content_type", e.target.value)
                    }
                    required
                  />
                  <span className="text-textColor-default ml-2">
                    {type.label}
                  </span>
                </label>
              ))}
            </div>
            <Spacer spacing={10} />
            {page.content_type === "chess_position" && (
              <>
                <textarea
                  placeholder="Paste PGN here"
                  className="w-full h-24 text-black p-2 border rounded-md"
                  value={page.pgn_text}
                  onChange={(e) =>
                    handleChange(pageIndex, "pgn_text", e.target.value)
                  }
                />
                <Spacer spacing={10} />
                <CCDivider text="OR" />
                <Spacer spacing={10} />
              </>
            )}
            <input
              type="file"
              accept={
                page.content_type === "chess_position"
                  ? ".pgn"
                  : page.content_type === "img"
                  ? "image/*"
                  : page.content_type === "video"
                  ? "video/*"
                  : ""
              }
              onChange={(e) => {
                if (e.target.files)
                  handleFileChange(pageIndex, e.target.files[0]);
              }}
              className="text-gray-500 border p-2 rounded-md"
            />
            <Spacer spacing={10} />
            {page.text !== undefined && (
              <RichTextEditor
                className="text-black"
                value={page.text}
                placeholder="Content of the Page"
                onChange={(content) => handleTextChange(pageIndex, content)}
              />
            )}
            <Spacer spacing={10} />
            <div className="flex items-start gap-10">
              <div>
                <div className="flex items-center gap-4">
                  <label className="block text-textColor-default font-medium">
                    Custom Pieces:
                  </label>
                  <div
                    className="cursor-pointer gap-1 flex text-textColor-default items-center"
                    onClick={() =>
                      handlePageCoins(
                        pageIndex,
                        page?.coins ? [...page.coins, ""] : [""]
                      )
                    }
                  >
                    <MdAddCircle fontSize={20} />
                    Add Coin
                  </div>
                </div>
                <Spacer spacing={10} />
                <div className="w-[200px]">
                  {page?.coins?.map((coin: string, coinIndex: number) => (
                    <div
                      key={coinIndex}
                      className="flex mb-2 gap-2 items-center"
                    >
                      <Image
                        src={WhiteCoin}
                        alt="White Coin"
                        width={24}
                        height={24}
                      />
                      <Input
                        key={coinIndex}
                        placeholder={`Coin ${coinIndex + 1} position`}
                        value={coin}
                        onChange={(e) => {
                          console.log("coin", coinIndex, e.target.value);
                          const coinsCopy = [...page.coins];
                          if (
                            /^[a-h]{1}[1-8]{0,1}$/g.test(e.target.value) ||
                            e.target.value === ""
                          ) {
                            coinsCopy[coinIndex] = e.target.value;
                            handlePageCoins(pageIndex, coinsCopy);
                          }
                        }}
                      />
                      <FaMinusCircle
                        fontSize={20}
                        className="cursor-pointer"
                        color="red"
                        onClick={() =>
                          handlePageCoins(
                            pageIndex,
                            page.coins.filter(
                              (_: string, i: number) => i !== coinIndex
                            )
                          )
                        }
                      />
                    </div>
                  ))}
                  <div className="flex gap-2 items-center">
                    <Image
                      src={WhiteFlag}
                      alt="White Coin"
                      width={24}
                      height={24}
                    />
                    <Input
                      placeholder="Flag position"
                      value={page.flag}
                      onChange={(e) =>
                        handleCustomPiecesChange(pageIndex, e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="w-[200px]">
                <label className="block mb-3 text-textColor-default font-medium">
                  Points:
                </label>
                <Input
                  type="number"
                  name="points"
                  placeholder="Points"
                  value={String(page.points)}
                  onChange={(e) =>
                    handleChange(pageIndex, "points", Number(e.target.value))
                  }
                />
              </div>
            </div>
            <Spacer spacing={20} />
            <div className="flex items-center gap-4">
              <label className="block text-textColor-default font-medium">
                MCQ Question:
              </label>
              {!page.mcq ? (
                <div
                  className="cursor-pointer gap-1 flex text-textColor-default items-center"
                  onClick={() => addMCQ(pageIndex)}
                >
                  <MdAddCircle fontSize={20} />
                  Add MCQ
                </div>
              ) : (
                <div
                  className="cursor-pointer gap-1 flex text-textColor-default items-center"
                  onClick={() => removeMCQ(pageIndex)}
                >
                  <FaMinusCircle fontSize={16} />
                  Remove MCQ
                </div>
              )}
            </div>
            {page.mcq && (
              <>
                <div key="mcq" className="border p-2 mb-4 rounded-lg">
                  <Input
                    placeholder="Question"
                    value={page?.mcq?.question}
                    onChange={(e) =>
                      handleMCQChange(pageIndex, "question", e.target.value)
                    }
                  />
                  <Spacer spacing={10} />
                  <h4 className="text-textColor-default">Options:</h4>
                  <Spacer spacing={5} />
                  <DndContext
                    onDragEnd={(event: DragEndEvent) =>
                      handleDragEnd(event, pageIndex)
                    }
                    collisionDetection={closestCenter}
                  >
                    <SortableContext
                      key={pageIndex}
                      items={page?.mcq?.options}
                      strategy={verticalListSortingStrategy}
                      disabled={sortingEnabled}
                    >
                      {page?.mcq?.options?.map(
                        (option: string, optionIndex: number) => (
                          <>
                            <SortableItem key={optionIndex} id={option}>
                              <div className="flex items-center gap-2">
                                <MdDragIndicator color="black" />
                                <h4 className="text-textColor-default">
                                  {optionIndex + 1}:
                                </h4>
                                <div
                                  className="w-full"
                                  onMouseEnter={() => setSortingEnabled(true)}
                                  onMouseLeave={() => setSortingEnabled(false)}
                                >
                                  <Input
                                    placeholder={`Option ${optionIndex + 1}`}
                                    value={option}
                                    onChange={(e) => {
                                      handleMCQChange(
                                        pageIndex,
                                        "options" as keyof MCQ,
                                        e.target.value,
                                        optionIndex
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </SortableItem>
                            <Spacer spacing={5} />
                          </>
                        )
                      )}
                    </SortableContext>
                  </DndContext>
                  <h4 className="text-textColor-default">Answer:</h4>
                  <Spacer spacing={5} />
                  <Input
                    placeholder="Answer"
                    value={page?.mcq?.answer}
                    onChange={(e) =>
                      handleMCQChange(pageIndex, "answer", e.target.value)
                    }
                  />
                </div>
              </>
            )}
            <Spacer spacing={8} />
            <CCDivider />
          </div>
        ))}
        <Button type="button" onClick={addPage} className="w-full">
          Add Page
        </Button>
        <Button type="submit" buttonType="aqua" className="w-full">
          Submit Chapter
        </Button>
      </form>
      <span className="text-sm text-gray-500">
        *Please make sure to fill all the fields and click submit before
        proceeding to next chapter
      </span>
    </div>
  );
}
