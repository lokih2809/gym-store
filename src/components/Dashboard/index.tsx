import React from "react";
import Card from "./Card";
import Chart from "./Chart";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="mt-4 flex flex-col flex-wrap justify-around gap-4 md:flex-row md:justify-start">
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
