import CCText from "@/atom/CCText";
import Spacer from "@/atom/Spacer";
import React from "react";
// import AddNewBook from "./Component/AddNewBook";
import UploadBookForm from "./Component/UploadBook";
import CCTabs from "@/atom/CCTabs";

function page() {
  const tabs = [
    {
      name: "Upload books",
      // icon: <Image alt="icon" src={TabRecommenedIcon} width={35} height={35} />,
      content: <UploadBookForm />,
    },
    {
      name: "Bundle books",
      // icon: <Image alt="icon" src={TabTimerIcon} width={35} height={35} />,
      content: <></>,
    },
    // {
    //   name: "Tab 3",
    //   // icon: <Image alt="icon" src={TabSearchIcon} width={35} height={35} />,
    //   content: <></>,
    // },
  ];
  return (
    <div className="m-5">
      <CCText className="text-3xl">Admin panel</CCText>
      <Spacer spacing={24} />
      <CCTabs tabs={tabs} active={0} />
    </div>
  );
}

export default page;
