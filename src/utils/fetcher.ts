import axios from "axios";

import { Comment, Post } from "../types/common";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${API_URL}/posts`);

  return response.data;
};

export const fetchPost = async (postId: number): Promise<Post> => {
  const response = await axios.get<Post>(`${API_URL}/posts/${postId}`);
  return response.data;
};

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const response = await axios.get<Comment[]>(
    `${API_URL}/posts/${postId}/comments`
  );
  return response.data;
};

export const createComment = async (
  id: number,
  commentData: Omit<Comment, "id">
): Promise<Comment> => {
  const response = await axios.post<Comment>(
    `${API_URL}/posts/${id}/comments`,
    {
      ...commentData,
    }
  );

  return response.data;
};

export const deleteComment = async (commentId: number): Promise<void> => {
  await axios.delete(`${API_URL}/comments/${commentId}`);
};

export const updateComment = async (
  commentId: number,
  updatedComment: Comment
): Promise<Comment> => {
  const response = await axios.put(
    `${API_URL}/comments/${commentId}`,
    updatedComment
  );
  return response.data;
};
