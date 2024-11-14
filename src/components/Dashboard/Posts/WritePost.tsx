import { JSONContent } from "@tiptap/react";
import PostEditor from "./EditPost";
import { createPost, editPost } from "@/lib/actions/postsActions";
import { Post } from "@prisma/client";

interface Props {
  postAction: "create" | "edit" | null;
  setPostAction: (action: "create" | "edit" | null) => void;
  currentPost: Post | null;
}

const WritePost = ({ postAction, setPostAction, currentPost }: Props) => {
  const handleSubmit = async (post: {
    title: string;
    thumbnail: string;
    content: JSONContent;
  }) => {
    try {
      const plainContent = JSON.parse(JSON.stringify(post.content));
      let newPost;

      if (postAction === "create") {
        newPost = await createPost(post.title, post.thumbnail, plainContent);
      } else if (postAction === "edit" && currentPost?.id) {
        newPost = await editPost(
          currentPost.id,
          post.title,
          post.thumbnail,
          plainContent,
        );
      } else {
        return;
      }

      if (newPost) {
        alert("Bài viết đã được lưu thành công!");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Đã xảy ra lỗi khi lưu bài viết");
    }
  };

  return (
    <PostEditor
      onSubmit={handleSubmit}
      setPostAction={setPostAction}
      initialValues={postAction === "edit" ? currentPost : null}
    />
  );
};

export default WritePost;
