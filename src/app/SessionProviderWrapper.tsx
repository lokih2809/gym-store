"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { useInitSession } from "@/hooks/useInitSession"; // Đảm bảo import đúng hook

const SessionProviderWrapper = ({ children }: { children: ReactNode }) => {
  useInitSession();

  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
