"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Sun",
    visit: 4000,
    click: 2400,
  },
  {
    name: "Mon",
    visit: 3000,
    click: 2100,
  },
  {
    name: "Tue",
    visit: 3500,
    click: 2000,
  },
  {
    name: "Wed",
    visit: 4000,
    click: 2800,
  },
  {
    name: "Thu",
    visit: 5000,
    click: 3000,
  },
  {
    name: "Fri",
    visit: 4000,
    click: 1000,
  },
  {
    name: "Sat",
    visit: 4000,
    click: 2400,
  },
];

const Chart = () => {
  return (
    <>
      <div className="h-[200px] rounded-lg bg-dashboard text-white lg:h-[430px]">
        <h2 className="p-4 text-xl">Weekly Recap</h2>
        <ResponsiveContainer width="98%" height="85%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="visit"
              stroke="#8884d8"
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="click"
              stroke="#82ca9d"
              strokeDasharray="3 4 5 2"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
