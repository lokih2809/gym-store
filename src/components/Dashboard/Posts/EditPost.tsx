import React, { useEffect, useState } from "react";
import { EditorContent, useEditor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Button from "@/components/common/Button";
import { X } from "lucide-react";
import InputImages from "../../common/InputImages";
import { Input } from "@mui/material";
import { Post } from "@prisma/client";
import Swal from "sweetalert2";

interface PostEditorProps {
  onSubmit: (post: {
    title: string;
    content: JSONContent;
    thumbnail: string;
  }) => void;
  setPostAction: (action: "create" | "edit" | null) => void;
  initialValues: Post | null;
}

const PostEditor = ({
  onSubmit,
  setPostAction,
  initialValues,
}: PostEditorProps) => {
  const [title, setTitle] = useState<string>(initialValues?.title || "");
  const [thumbnail, setThumbnail] = useState<string>(
    initialValues?.thumbnail || "",
  );

  const initialContent = JSON.stringify(initialValues?.content) || "";

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: initialContent,
    editable: true,
  });

  useEffect(() => {
    if (editor && initialValues) {
      if (editor.getJSON() !== initialValues.content) {
        editor.commands.setContent(initialValues.content || "");
      }
      setTitle(initialValues.title || "");
      setThumbnail(initialValues.thumbnail || "");
    }
  }, [initialValues, editor]);

  const handleThumbnailChange = (images: string | string[]) => {
    if (typeof images === "string") {
      setThumbnail(images);
    }
  };

  const handleSubmit = () => {
    if (editor && title.trim() !== "") {
      const postContent = editor.getJSON();
      const postThumbnail = thumbnail || "";

      onSubmit({ title, content: postContent, thumbnail: postThumbnail });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Bạn phải nhập đủ thông tin bài viết.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black bg-opacity-25">
        <div className="absolute z-30 flex w-11/12 animate-slide-in-bottom flex-col rounded-lg bg-white py-8 text-black lg:w-1/2 lg:animate-slide-in-right">
          <div className="flex justify-center p-4">
            <span className="m-auto text-xl font-bold">
              {initialValues ? "Edit Post" : "Create Post"}
            </span>
            <X className="cursor-pointer" onClick={() => setPostAction(null)} />
          </div>

          <div className="space-y-4 px-8">
            <Input
              type="text"
              placeholder="Tiêu đề"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <InputImages
              label="Chọn Thumbnail"
              name="thumbnail"
              type="file"
              isArray={false}
              onChange={handleThumbnailChange}
              defaultImages={
                initialValues?.thumbnail ? [initialValues.thumbnail] : []
              }
            />

            <div>
              <span>Nội dung</span>
              <div className="max-h-[60vh] overflow-y-scroll border border-black p-2">
                <EditorContent editor={editor} />
              </div>
            </div>
            <Button isPrimary className="px-4" onClick={handleSubmit}>
              {initialValues ? "Lưu Bài Viết" : "Tạo Bài Viết"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostEditor;
