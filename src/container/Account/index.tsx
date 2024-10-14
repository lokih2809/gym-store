"use client";

import Account from "@/components/Account";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const AccountContainer = () => {
  const { data: session } = useSession();
  if (!session) redirect("/login");

  return <Account user={session.user} />;
};

export default AccountContainer;
