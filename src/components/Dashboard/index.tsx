import React from "react";
import Card from "./Card";
import Transactions from "./Transactions";
import Chart from "./Chart";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-4">
          <Card />
          <Card />
          <Card />
        </div>
        <Transactions />
        <Chart />
      </div>
    </>
  );
};

export default Dashboard;
