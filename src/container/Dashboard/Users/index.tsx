import Users from "@/components/Dashboard/Users";
import db from "@/lib/client";

const UsersContainer = async () => {
  const listUsers = await db.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      address: true,
      createdAt: true,
      updatedAt: true,
      role: true,
    },
  });
  return <Users listUsers={listUsers} />;
};

export default UsersContainer;
