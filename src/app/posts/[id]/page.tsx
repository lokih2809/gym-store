import PostsDetailContainer from "@/container/Posts/[id]";
import React from "react";

const Page = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;

  return <PostsDetailContainer id={+id} />;
};

export default Page;
