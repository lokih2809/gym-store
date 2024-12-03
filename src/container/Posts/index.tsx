import Posts from "@/components/Posts";
import db from "@/lib/client";
import React from "react";

type Props = {};

const PostsContainer = async (props: Props) => {
  const listPosts = await db.post.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  return <Posts listPosts={listPosts} />;
};

export default PostsContainer;
