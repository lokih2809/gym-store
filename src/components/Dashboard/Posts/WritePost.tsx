import { JSONContent } from "@tiptap/react";
import PostEditor from "./EditPost";
import { createPost, editPost } from "@/lib/actions/postsActions";
import { Post } from "@prisma/client";
import {
  catchErrorSystem,
  confirmWithNotification,
  showNotification,
} from "@/utils/utils";
import { useRouter } from "next/navigation";

interface Props {
  postAction: "create" | "edit" | null;
  setPostAction: (action: "create" | "edit" | null) => void;
  currentPost: Post | null;
  setCurrentPost: (post: Post | null) => void;
}

const WritePost = ({
  postAction,
  setPostAction,
  currentPost,
  setCurrentPost,
}: Props) => {
  const router = useRouter();
  const isCreate = postAction === "create";

  const thenSuccess = () => {
    setPostAction(null);
    setCurrentPost(null);
    router.refresh();
  };

  const handleSubmit = async (post: {
    title: string;
    thumbnail: string;
    content: JSONContent;
  }) => {
    const confirmResult = await confirmWithNotification(
      isCreate
        ? "Bạn có muốn thêm bài viết mới?"
        : "Bạn có chắc chắn cập nhật bài viết này?",
    );
    if (!confirmResult.isConfirmed) return;

    try {
      const plainContent = JSON.parse(JSON.stringify(post.content));

      const response = isCreate
        ? await createPost(post.title, post.thumbnail, plainContent)
        : currentPost?.id &&
          (await editPost(
            currentPost.id,
            post.title,
            post.thumbnail,
            plainContent,
          ));

      response &&
        showNotification({
          response,
          thenSuccess,
        });
    } catch (error) {
      catchErrorSystem();
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
