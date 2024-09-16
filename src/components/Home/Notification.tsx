"use client";

import { NOTIFICATION_MESSAGES } from "@/constants/fakeData";
import React, { useEffect, useState } from "react";

type Props = {
  isMobile?: boolean;
};

const Notification = ({ isMobile }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NOTIFICATION_MESSAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className={`relative w-full justify-center overflow-hidden bg-slate-100 ${isMobile ? "flex h-10 py-2 lg:hidden" : "hidden h-14 py-4 lg:flex"}`}
    >
      <div
        key={NOTIFICATION_MESSAGES[currentIndex]}
        className="absolute transform animate-slide-in"
      >
        <span
          className={`block cursor-pointer font-bold hover:underline ${isMobile && "text-xs"}`}
        >
          {NOTIFICATION_MESSAGES[currentIndex].toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default Notification;
