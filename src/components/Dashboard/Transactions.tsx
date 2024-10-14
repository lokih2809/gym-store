import Image from "next/image";
import React from "react";

const Transactions = () => {
  return (
    <>
      <div className="rounded-lg bg-dashboard text-white">
        <h2 className="p-4 text-xl">Latest Transactions</h2>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-white rtl:text-right">
            <thead className="border-b bg-dashboard text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-dashboard">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-white"
                >
                  Lok1
                </th>
                <td className="px-6 py-4">
                  <span className="rounded-md bg-yellow-600 p-1">Pending</span>
                </td>
                <td className="px-6 py-4">12.10.2024</td>
                <td className="px-6 py-4">$300</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-dashboard">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-white"
                >
                  Lok1
                </th>
                <td className="px-6 py-4">
                  <span className="rounded-md bg-yellow-600 p-1">Pending</span>
                </td>
                <td className="px-6 py-4">12.10.2024</td>
                <td className="px-6 py-4">$300</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className="bg-dashboard dark:bg-gray-800 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-white"
                >
                  Lok1
                </th>
                <td className="px-6 py-4">
                  <span className="rounded-md bg-yellow-600 p-1">Pending</span>
                </td>
                <td className="px-6 py-4">12.10.2024</td>
                <td className="px-6 py-4">$300</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Transactions;
