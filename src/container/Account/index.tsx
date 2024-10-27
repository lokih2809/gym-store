"use client";

import { RootState } from "@/app/redux/store";
import Account from "@/components/Account";
import React from "react";
import { useSelector } from "react-redux";

const AccountContainer = () => {
  const user = useSelector((state: RootState) => state.session.user);

  return <Account user={user} />;
};

export default AccountContainer;
