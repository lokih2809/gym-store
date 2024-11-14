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
    <div className="p-24">
      <h1 className="w-[80%] text-6xl font-medium leading-normal tracking-wider">
        {post.title}
      </h1>
      <div className="flex gap-12">
        <div className="flex w-[80%] flex-col gap-16">
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
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="px-[20%]">
            <EditorContent
              editor={editor}
              className="space-y-2 text-lg leading-loose text-gray-500"
            />
          </div>
        </div>

        <div className="w-[20%]">
          <RecentPosts />
        </div>
      </div>
    </div>
  );
};

export default PostsDetail;
