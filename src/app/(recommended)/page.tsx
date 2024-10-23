import CCTabs from "@/atom/CCTabs";
import CCText from "@/atom/CCText";
import Banner from "@/components/Banner";
import Image from "next/image";
import TabRecommenedIcon from "@/assets/explore/expore-tab-recommended.svg";
import TabSearchIcon from "@/assets/explore/explore-tab-search.svg";
import TabTimerIcon from "@/assets/explore/explore-tab-timer.svg";
import RecommendedSection from "./components/RecommendedSection";

export default async function Home() {
  const tabs = [
    {
      name: "Recommended",
      icon: <Image alt="icon" src={TabRecommenedIcon} width={35} height={35} />,
      content: <RecommendedSection />,
    },
    {
      name: "My Learnings",
      icon: <Image alt="icon" src={TabTimerIcon} width={35} height={35} />,
      content: <CCText>Here are your Settings</CCText>,
    },
    {
      name: "Explore Courses",
      icon: <Image alt="icon" src={TabSearchIcon} width={35} height={35} />,
      content: <CCText>This is your Profile</CCText>,
    },
  ];
  return (
    <>
      <Banner />
      <div className="-mt-6">
        <CCTabs tabs={tabs} />
      </div>
    </>
  );
}
