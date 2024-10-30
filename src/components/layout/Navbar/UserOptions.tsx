import { User } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const UserOptions = () => {
  const user = useSelector((state: RootState) => state.session.user);

  return (
    <>
      <Link href={user ? "/account" : "/login"}>
        <User />
      </Link>
    </>
  );
};

export default UserOptions;
