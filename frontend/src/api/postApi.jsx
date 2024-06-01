import axios from "axios";
import { readAndLog, readAndReturn } from "../utils/responseHandler.tsx";

// Use environment variable for API URL
const API_URL = "http://localhost:5050/api/community";

// Function to submit a new post
export const postPost = async (postData, action) => {
  try {
    console.log("Posting data:", postData);
    const res = await axios.post(`${API_URL}/posts`, postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = readAndReturn(res, "Failed to submit post");
    action(data);
  } catch (error) {
    console.error("Error submitting post:", error);
  }
};

// Function to like a post
export const postLikes = async (postId, userId) => {
  try {
    const res = await axios.post(`${API_URL}/posts/${postId}/likes`, {
      userId,
    });
    readAndLog(res, "Post liked successfully", "Failed to like post");
  } catch (err) {
    console.error("Error liking post:", err);
  }
};

// Function to get all posts
export const getAllPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}/posts`);
    return res.data;
  } catch (error) {
    console.error("Failed to get posts:", error);
  }
};

// Function to get all posts by a specific user
export const getAllPostsByUserId = async (userId) => {
  try {
    const res = await axios.get(`${API_URL}/posts/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Failed to get posts by user:", error);
  }
};

// Function to modify a post
export const modifyPost = async (postId, postData) => {
  try {
    const res = await axios.put(`${API_URL}/posts/${postId}`, postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to modify post:", error);
  }
};

// Function to delete a post
export const deletePost = async (postId) => {
  try {
    const res = await axios.delete(`${API_URL}/posts/${postId}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete post:", error);
  }
};

// Function to unlike a post
export const unlikePost = async (postId, userId) => {
  try {
    const res = await axios.post(`${API_URL}/posts/${postId}/unlikes`, {
      userId,
    });
    readAndLog(res, "Post unliked successfully", "Failed to unlike post");
  } catch (err) {
    console.error("Error unliking post:", err);
  }
};
