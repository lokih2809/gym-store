"use client";

import { Post } from "@prisma/client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image as ImageTipTap } from "@tiptap/extension-image";
import Image from "next/image";
import { formatDate } from "@/utils/utils";
import RecentPosts from "../RecentPosts";

interface PostPageProps {
  post: Post;
}

const PostsDetail = ({ post }: PostPageProps) => {
  const content =
    typeof post.content === "string" ? JSON.parse(post.content) : post.content;

  const editor = useEditor({
    extensions: [StarterKit, ImageTipTap],
    content: content,
    editable: false,
  });

  return (
    <div className="space-y-4 p-4 xl:space-y-0 xl:p-24">
      <span className="text-sm font-semibold uppercase tracking-widest text-gray-400">
        Product & style
      </span>
      <h1 className="w-full text-2xl font-medium leading-normal tracking-wider xl:w-[80%] xl:text-6xl">
        {post.title}
      </h1>
      <div className="flex flex-col gap-4 xl:flex-row xl:gap-12">
        <div className="flex flex-col gap-16 xl:w-[80%]">
          <span className="text-sm text-gray-500">
            {formatDate(post.createdAt)} / Last Edited{" "}
            {formatDate(post.updatedAt)}
          </span>
          <div className="relative h-auto w-full">
            <Image
              src={post.thumbnail}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              priority
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="xl:px-[20%]">
            <EditorContent
              editor={editor}
              className="space-y-2 text-lg leading-loose text-gray-500"
            />
          </div>
        </div>

        <div className="xl:w-[20%]">
          <RecentPosts />
        </div>
      </div>
    </div>
  );
};

export default PostsDetail;
