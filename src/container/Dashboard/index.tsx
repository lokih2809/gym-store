import Dashboard from "@/components/Dashboard";
import db from "@/lib/client";

const DashboardContainer = async () => {
  const listOrders = await db.order.findMany({
    take: 5,
    include: {
      user: true,
      orderItems: {
        include: {
          product: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <Dashboard listOrders={listOrders} />;
};

export default DashboardContainer;
