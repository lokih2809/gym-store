"use client";

import React, { useEffect, useState } from "react";

export const NOTIFICATION_MESSAGES = [
  "10% student discount",
  "free 30-day return policy. *exclusive apply ",
  "shipping: please refer to our delivery information",
];

interface Props {
  isMobile?: boolean;
}

const Notification = ({ isMobile }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NOTIFICATION_MESSAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div
        className={`relative w-full justify-center overflow-hidden bg-slate-100 ${isMobile ? "flex h-10 py-3 lg:hidden" : "hidden h-12 py-4 lg:flex"}`}
      >
        <div
          key={NOTIFICATION_MESSAGES[currentIndex]}
          className="animate-slide-in absolute transform"
        >
          <span
            className={`block cursor-pointer text-sm font-bold hover:underline ${isMobile && "text-xs"}`}
          >
            {NOTIFICATION_MESSAGES[currentIndex].toUpperCase()}
          </span>
        </div>
      </div>
    </>
  );
};

export default Notification;
