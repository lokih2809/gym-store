import PostsDetailContainer from "@/container/Posts/[id]";
import React from "react";

const page = async ({ params }: { params: { id: number } }) => {
  const { id } = params;

  return <PostsDetailContainer id={+id} />;
};

export default page;