import Posts from "@/components/Dashboard/Posts";
import db from "@/lib/client";
import React from "react";

const PostsContainer = async () => {
  const listPosts = await db.post.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return <Posts listPosts={listPosts} />;
};

export default PostsContainer;
