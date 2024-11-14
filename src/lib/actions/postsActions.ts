"use server";

import db from "../client";

// Create Post
export const createPost = async (
  title: string,
  thumbnail: string,
  content: any,
) => {
  try {
    await db.post.create({
      data: {
        title,
        thumbnail,
        content,
      },
    });
    return { status: "success", message: "Tạo bài viết thành công." };
  } catch (error) {
    console.error("Error creating post:", error);
    return { status: "error", message: "Lỗi khi tạo bài viết." };
  }
};

// Edit Post
export const editPost = async (
  id: number,
  title: string,
  thumbnail: string,
  content: any,
) => {
  try {
    await db.post.update({
      where: { id },
      data: {
        title,
        thumbnail,
        content,
      },
    });
    return { status: "success", message: "Cập nhật bài viết thành công." };
  } catch (error) {
    console.error("Error editing post:", error);
    return { status: "error", message: "Cập nhật thất bại, có lỗi xảy ra." };
  }
};

// Delete Post
export const deletePost = async (id: number) => {
  try {
    await db.post.delete({
      where: { id },
    });
    return { status: "success", message: "Đã xóa bài viết thành công." };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { status: "error", message: "Có lỗi xảy ra khi xóa bài viết." };
  }
};

// Recent Posts
export const getRecentPosts = async () => {
  try {
    const posts = await db.post.findMany({
      take: 5,
      orderBy: {
        updatedAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    return;
  }
};
