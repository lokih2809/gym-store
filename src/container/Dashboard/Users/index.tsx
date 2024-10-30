import Users from "@/components/Dashboard/Users";
import db from "@/lib/client";

const UsersContainer = async () => {
  const listUsers = await db.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      role: true,
      address: true,
    },
  });

  return <Users listUsers={listUsers} />;
};

export default UsersContainer;
