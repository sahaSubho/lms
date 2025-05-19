"use client";
import { useEffect, useState } from "react";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import Cookies from "js-cookie";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLayout, setShowLayout] = useState(false);
  const key = Cookies.get('no_header')

  function isInIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      // Access denied due to cross-origin — treat as inside iframe
      console.log(e)
      return true;
    }
  }

  useEffect(() => {
    if (key === "1" && isInIframe()) {
      setShowLayout(false);
    } else {
      setShowLayout(true);
    }
  }, [key]);

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
