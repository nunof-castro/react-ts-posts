import axios from "axios";

import { Comment, Post } from "../types/common";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${API_URL}/posts`);

  return response.data;
};

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const response = await axios.get(`${API_URL}/comments?postId=${postId}`);
  return response.data;
};
