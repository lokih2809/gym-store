import React from "react";
import Card from "./Card";
import Transactions from "./Transactions";
import Chart from "./Chart";
import RightBar from "./RightBar";

const Dashboard = () => {
  return (
    <>
      <div className="flex gap-4">
        {/* Left */}
        <div className="w-9/12 space-y-4">
          <div className="flex justify-between gap-4">
            <Card />
            <Card />
            <Card />
          </div>
          <Transactions />
          <Chart />
        </div>

        {/* Right */}
        <RightBar />
      </div>
    </>
  );
};

export default Dashboard;
