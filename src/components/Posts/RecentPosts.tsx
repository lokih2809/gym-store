"use client";

import { getRecentPosts } from "@/lib/actions/postsActions";
import { formatDate } from "@/utils/utils";
import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RecentPosts = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  useEffect(() => {
    const fetchApiGetPosts = async () => {
      const recentPosts = await getRecentPosts();
      if (recentPosts) setPosts(recentPosts);
    };
    fetchApiGetPosts();
  }, []);

  return (
    <>
      <div className="mt-20 space-y-4">
        <span className="font-bold">You may like</span>
        <div className="flex flex-col gap-16 md:flex-row md:gap-4 xl:flex-col xl:gap-16">
          {posts?.map((post: Post) => (
            <Link
              href={`/posts/${post.id}`}
              key={post.id}
              className="flex flex-col gap-2"
            >
              <div className="h-auto w-full">
                <Image
                  src={post.thumbnail}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-auto w-full object-cover"
                />
              </div>

              <h1 className="cursor-pointer font-semibold uppercase">
                {post.title}
              </h1>
              <span className="text-sm text-gray-400">
                {formatDate(post.updatedAt)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentPosts;
