import React from "react";
import Card from "./Card";
import Chart from "./Chart";

interface Props {
  ordersCount: number;
  usersCount: number;
  productsCount: number;
}

const Dashboard = ({ ordersCount, usersCount, productsCount }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="mt-4 flex flex-col flex-wrap justify-around gap-4 md:flex-row md:justify-start">
          <Card title="Orders" count={ordersCount} />
          <Card title="Users" count={usersCount} />
          <Card title="Products" count={productsCount} />
        </div>
        <Chart />
      </div>
    </>
  );
};

export default Dashboard;
