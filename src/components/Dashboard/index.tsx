import React from "react";
import Card from "./Card";
import Chart from "./Chart";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="mt-4 flex flex-col justify-around gap-4 lg:flex-row">
          <Card />
          <Card />
          <Card />
        </div>
        <Chart />
      </div>
    </>
  );
};

export default Dashboard;
