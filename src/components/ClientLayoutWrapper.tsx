"use client";
import { useEffect, useState } from "react";
import Header from "./Header";
import LeftMenu from "./LeftMenu";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLayout, setShowLayout] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem("show-header-navbar");

    if (key === null || key === "true") {
      setShowLayout(true);
    } else {
      setShowLayout(false);
    }
  }, []);

  return (
    <>
      {showLayout && (
        <>
          <Header />
          <LeftMenu />
        </>
      )}
      <div style={{ marginLeft: showLayout ? 68 : 0 }}>
        {/* <Spacer spacing={72} horizontal /> */}
        {children}
      </div>
    </>
  );
}
