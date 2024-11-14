"use client";

import {
  confirmWithNotification,
  formatDate,
  getFilteredAndPaginatedData,
} from "@/utils/utils";
import { Post } from "@prisma/client";
import React, { useState } from "react";
import SearchBoxDashboard from "../SearchBoxDashboard";
import Button from "@/components/common/Button";
import WritePost from "./WritePost";
import { deletePost } from "@/lib/actions/postsActions";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

type Props = {
  listPosts: Post[];
};

const Posts = ({ listPosts }: Props) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postAction, setPostAction] = useState<"create" | "edit" | null>(null);
  const [post, setPost] = useState<Post | null>(null);

  const { paginatedData, totalPages, handleNext, handlePrevious } =
    getFilteredAndPaginatedData(listPosts, searchTerm, currentPage, 10, [
      "title",
    ]);

  const nextPage = () => setCurrentPage(handleNext());
  const previousPage = () => setCurrentPage(handlePrevious());

  const handleEditPost = (post: Post) => {
    setPost(post);
    setPostAction("edit");
  };

  const handleDeletePost = async (id: number) => {
    const confirmResult = await confirmWithNotification();
    if (confirmResult.isConfirmed) {
      const response = await deletePost(id);
      try {
        if (response.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: response.message || "Xóa bài viết thành công.",
            confirmButtonText: "OK",
          }).then(() => {
            router.refresh();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: response.message || "Có lỗi xảy ra! Vui lòng thử lại sau.",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="bg-dashboard relative space-y-8 rounded-lg px-2 py-4 text-white lg:p-8">
        {/* Top */}
        <div className="flex items-center justify-between gap-2">
          <SearchBoxDashboard
            placeholder="Search for a post"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="" onClick={() => setPostAction("create")}>
            Create
          </Button>
        </div>

        {/* Content */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-4 py-2 lg:px-6 lg:py-3">
                  id
                </th>
                <th scope="col" className="p-2 lg:px-6 lg:py-3">
                  title
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-2 lg:table-cell lg:px-6 lg:py-3"
                >
                  createdAt
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-2 lg:table-cell lg:px-6 lg:py-3"
                >
                  updatedAt
                </th>

                <th scope="col" className="px-4 py-2 lg:px-6 lg:py-3"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((post: Post) => (
                <tr className="border-b text-white" key={post.id}>
                  <th
                    scope="row"
                    className={`max-w-44 truncate px-4 py-2 font-medium lg:whitespace-nowrap lg:px-6 lg:py-4`}
                  >
                    {post.id}
                  </th>
                  <td className="p-2 lg:px-6 lg:py-3">{post.title}</td>
                  <td className="hidden lg:table-cell lg:px-6 lg:py-3">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="hidden px-4 py-2 lg:table-cell lg:px-6 lg:py-3">
                    {formatDate(post.updatedAt)}
                  </td>

                  <td className={`flex gap-2 px-6 py-4`}>
                    <button
                      className="font-medium text-blue-500 hover:underline"
                      onClick={() => handleEditPost(post)}
                    >
                      Edit
                    </button>
                    <span>|</span>
                    <button
                      className="font-medium text-red-500 hover:underline"
                      onClick={() => handleDeletePost(post.id)}
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

      {postAction && (
        <WritePost
          postAction={postAction}
          setPostAction={setPostAction}
          currentPost={post}
        />
      )}
    </>
  );
};

export default Posts;
