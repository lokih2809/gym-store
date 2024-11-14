"use client";

import SearchBoxDashboard from "../SearchBoxDashboard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  formatDate,
  getFilteredAndPaginatedData,
  handleDelete,
} from "@/utils/utils";
import { ADMIN_MAIL } from "@/constants/common";
import CreateAccountForm from "./CreateAccountForm";
import EditAccountForm from "./EditAccountForm";
import Button from "@/components/common/Button";
import { UserWithoutPassword } from "@/types/common";

interface Props {
  listUsers: UserWithoutPassword[];
}

const Users = ({ listUsers }: Props) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { paginatedData, totalPages, handleNext, handlePrevious } =
    getFilteredAndPaginatedData(listUsers, searchTerm, currentPage, 10, [
      "name",
      "email",
      "username",
    ]);

  const nextPage = () => setCurrentPage(handleNext());
  const previousPage = () => setCurrentPage(handlePrevious());

  return (
    <>
      <div className="bg-dashboard relative space-y-8 rounded-lg px-2 py-4 text-white lg:p-8">
        {/* Top */}
        <div className="flex items-center justify-between gap-2">
          <SearchBoxDashboard
            placeholder="Search for a user"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CreateAccountForm />
        </div>

        {/* Content */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-4 py-2 lg:px-6 lg:py-3">
                  Email
                </th>
                <th scope="col" className="p-2 lg:px-6 lg:py-3">
                  Username
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-2 lg:table-cell lg:px-6 lg:py-3"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-2 lg:table-cell lg:px-6 lg:py-3"
                >
                  CreatedAt
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-2 lg:table-cell lg:px-6 lg:py-3"
                >
                  Role
                </th>
                <th scope="col" className="px-4 py-2 lg:px-6 lg:py-3"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user) => (
                <tr className="border-b text-white" key={user.id}>
                  <th
                    scope="row"
                    className={`max-w-44 truncate px-4 py-2 font-medium lg:whitespace-nowrap lg:px-6 lg:py-4 ${user.email === ADMIN_MAIL && "text-red-500"}`}
                  >
                    {user.email}
                  </th>
                  <td className="p-2 lg:px-6 lg:py-3">{user.username}</td>
                  <td className="hidden lg:table-cell lg:px-6 lg:py-3">
                    {user.name}
                  </td>
                  <td className="hidden px-4 py-2 lg:table-cell lg:px-6 lg:py-3">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="hidden lg:table-cell lg:px-6 lg:py-3">
                    {user.role}
                  </td>

                  <td
                    className={`flex gap-2 px-6 py-4 ${user.email === ADMIN_MAIL && "hidden"}`}
                  >
                    <EditAccountForm user={user} />
                    <span>|</span>
                    <button
                      className="font-medium text-red-500 hover:underline"
                      onClick={() => handleDelete(user.id, "user", router)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <Button
            className="w-20 bg-white p-1 text-black"
            disabled={currentPage === 1}
            onClick={previousPage}
          >
            Previous
          </Button>
          <small>{currentPage}</small>
          <Button
            className="w-20 bg-white p-1 text-black"
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default Users;
