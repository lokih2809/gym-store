import Posts from "@/components/Posts/[id]";
import db from "@/lib/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  id: number;
}

const PostsDetailContainer = async ({ id }: Props) => {
  const post = await db.post.findUnique({
    where: {
      id,
    },
  });

  if (!post) return notFound();
  return <Posts post={post} />;
};

export default PostsDetailContainer;
