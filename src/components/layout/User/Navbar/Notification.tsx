"use client";

import React, { useEffect, useState } from "react";

export const NOTIFICATION_MESSAGES = [
  "Giảm giá 10% cho sinh viên.",
  "Chính sách hoàn trả miễn phí trong 30 ngày. (áp dụng điều kiện độc quyền)",
  "Giao hàng: Vui lòng tham khảo thông tin giao hàng của chúng tôi.",
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
        className={`relative w-full justify-center overflow-hidden bg-slate-100 text-center ${isMobile ? "flex h-12 py-3 lg:hidden" : "hidden h-12 py-4 lg:flex"}`}
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
