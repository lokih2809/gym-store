import React from "react";
import Card from "./Card";
import Transactions from "./Transactions";
import Chart from "./Chart";
import { OrderWithUser } from "@/types/common";

interface Props {
  listOrders: OrderWithUser[];
}

const Dashboard = ({ listOrders }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 lg:flex-row">
          <Card />
          <Card />
          <Card />
        </div>
        <Transactions listOrders={listOrders} />
        <Chart />
      </div>
    </>
  );
};

export default Dashboard;
