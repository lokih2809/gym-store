"use client";

import { formatDate } from "@/utils/utils";
import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RecentPosts from "./RecentPosts";
import { POSTS_LINK } from "@/constants/common";

interface Props {
  listPosts: Post[];
}

const featuredPost = [
  {
    id: 1,
    name: "Các bài tập tốt nhất để tăng cường cơ đùi sau.",
    category: "Fitness",
  },
  {
    id: 2,
    name: "Hướng dẫn phong cách nam: Cách phối đồ với quần sweatpants xám.",
    category: "Sản phẩm & Phong cách",
  },
  {
    id: 3,
    name: "6 động tác giãn cơ mỗi người chạy bộ nên thực hiện để tránh chấn thương.",
    category: "Fitness",
  },
  {
    id: 4,
    name: "Các chương trình tập luyện tốt nhất cho mọi mục tiêu.",
    category: "Fitness",
  },
  {
    id: 5,
    name: "Cách phối tất cổ cao với quần legging và những mẹo phối đồ khác.",
    category: "Sản phẩm & Phong cách",
  },
];

const Posts = ({ listPosts }: Props) => {
  return (
    <>
      <div className="px-4 md:px-8 lg:px-12 xl:px-20">
        {/* Top */}
        <div className="py-20 text-center font-bold">
          <h1 className="text-4xl">GYMSHARK</h1>
          <span className="text-xs tracking-widest">CENTRAL</span>
        </div>

        <hr className="py-6" />

        {/* Content */}
        <div className="flex gap-12">
          {/* Left */}
          <div className="hidden w-[20%] flex-col gap-6 xl:flex">
            <span className="text-lg font-bold uppercase">Nổi bật</span>
            {featuredPost.map((post) => (
              <div className="flex flex-col gap-2" key={post.id}>
                <span className="text-4xl text-gray-400">
                  {post.id < 10 ? "0" : ""}
                  {post.id}
                </span>
                <span className="text-xl">{post.name}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {post.category}
                </span>
              </div>
            ))}
          </div>

          {/* Mid */}
          <div className="w-full space-y-8 xl:w-[60%]">
            <span className="text-lg font-bold uppercase">Mới nhất</span>
            <div className="flex flex-wrap gap-8">
              {listPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex w-full flex-col gap-4 xl:max-w-[48%]"
                >
                  <Image
                    src={post.thumbnail}
                    alt=""
                    width={0}
                    height={0}
                    sizes="48vw"
                    className="h-auto w-full object-cover"
                  />
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-400">
                    Product & style
                  </span>
                  <Link
                    href={`${POSTS_LINK}/${post.id}`}
                    className="text-xl font-medium hover:opacity-60"
                  >
                    {post.title}
                  </Link>
                  <span className="text-xs font-bold uppercase text-gray-500">
                    {formatDate(post.updatedAt)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="hidden space-y-8 xl:block xl:w-[20%]">
            <span className="text-lg font-bold uppercase">
              Lựa chọn của biên tập viên
            </span>
            <RecentPosts />
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
