import Button from "@/components/common/Button";
import SearchBoxDashboard from "../SearchBoxDashboard";
import Link from "next/link";

const Users = () => {
  return (
    <>
      <div className="space-y-8 rounded-lg bg-dashboard p-8 text-white">
        {/* Top */}
        <div className="flex items-center justify-between">
          <SearchBoxDashboard placeholder="Search for a user" />

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
                <tr className="border-b text-white">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium"
                  >
                    Lok1ondafire@gmail.com
                  </th>
                  <td className="px-6 py-4">lok1dev</td>
                  <td className="px-6 py-4">Minh</td>
                  <td className="px-6 py-4">13.10.2024</td>
                  <td className="px-6 py-4">Admin</td>

                  <td className="space-x-2 px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <span>|</span>
                    <a
                      href="#"
                      className="font-medium text-red-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
                <tr className="border-b text-white">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium"
                  >
                    Lok1ondafire@gmail.com
                  </th>
                  <td className="px-6 py-4">lok1dev</td>
                  <td className="px-6 py-4">Minh</td>
                  <td className="px-6 py-4">13.10.2024</td>
                  <td className="px-6 py-4">Admin</td>
                  <td className="space-x-2 px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <span>|</span>
                    <a
                      href="#"
                      className="font-medium text-red-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <button className="w-20 bg-white p-1 text-black">Previous</button>
          <button className="w-20 bg-white p-1 text-black">Next</button>
        </div>
      </div>
    </>
  );
};

export default Users;
