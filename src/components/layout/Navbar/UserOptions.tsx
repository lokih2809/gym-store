import { User } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const UserOptions = () => {
  const { data: session } = useSession();

  return (
    <Link href={session ? "/account" : "/login"}>
      <User />
    </Link>
  );
};

export default UserOptions;
