import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserOptions = () => {
  const { data: session } = useSession();

  return (
    <Link href={session ? "/account" : "/login"}>
      <User />
    </Link>
  );
};

export default UserOptions;
