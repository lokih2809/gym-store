"use client";

import Button from "@/components/common/Button";
import SearchBoxDashboard from "../SearchBoxDashboard";
import Link from "next/link";
import { User } from "@prisma/client";
import { useState } from "react";
import db from "@/lib/client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/lib/actions";
import EditUser from "./EditUser";
import {
  formatDate,
  getFilteredAndPaginatedData,
  handleDelete,
} from "@/utils/utils";

interface Props {
  listUsers: Omit<User, "password">[];
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
      <div className="relative space-y-8 rounded-lg bg-dashboard p-8 text-white">
        {/* Top */}
        <div className="flex items-center justify-between">
          <SearchBoxDashboard
            placeholder="Search for a user"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button className="bg-purple-600 px-4 py-2 text-white hover:bg-opacity-60">
            <Link href={"/dashboard/users/add"}>Add new</Link>
          </Button>
        </div>

        {/* Content */}
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="text-xs uppercase text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CreatedAt
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((user) => (
                  <tr className="border-b text-white" key={user.id}>
                    <th
                      scope="row"
                      className={`whitespace-nowrap px-6 py-4 font-medium ${user.email === process.env.NEXT_PUBLIC_MAIL_ADMIN && "text-red-500"}`}
                    >
                      {user.email}
                    </th>
                    <td className={`$ px-6 py-4`}>{user.username}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-4">{user.role}</td>

                    <td
                      className={`flex gap-2 px-6 py-4 ${user.email === process.env.NEXT_PUBLIC_MAIL_ADMIN && "hidden"}`}
                    >
                      <EditUser user={user} />
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
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <button
            className="w-20 bg-white p-1 text-black"
            disabled={currentPage === 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <small>{currentPage}</small>
          <button
            className="w-20 bg-white p-1 text-black"
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Users;
