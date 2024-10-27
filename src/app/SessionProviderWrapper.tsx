"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { useInitSession } from "@/hooks/useInitSession"; // Đảm bảo import đúng hook

const SessionProviderWrapper = ({ children }: { children: ReactNode }) => {
  // Gọi hook khởi tạo session và lưu vào Redux
  useInitSession();

  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
