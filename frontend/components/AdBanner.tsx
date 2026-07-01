"use client";
import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className="w-full text-center my-4 overflow-hidden flex justify-center min-h-[100px]">
      {/* Homepage Top Banner */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", minWidth: "320px", minHeight: "100px" }}
        data-ad-client="ca-pub-3535084807721669"
        data-ad-slot="2735098257"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
