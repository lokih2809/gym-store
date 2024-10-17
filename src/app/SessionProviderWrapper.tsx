"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth"; 

const SessionProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null); 

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session); 
    };
    fetchSession();
  }, []);

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
