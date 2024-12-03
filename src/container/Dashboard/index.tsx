import Dashboard from "@/components/Dashboard";
import db from "@/lib/client";

const DashboardContainer = async () => {
  const ordersCount = await db.order.count();
  const usersCount = await db.user.count();
  const productsCount = await db.product.count();

  return (
    <Dashboard
      ordersCount={ordersCount}
      usersCount={usersCount}
      productsCount={productsCount}
    />
  );
};

export default DashboardContainer;
