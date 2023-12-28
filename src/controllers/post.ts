// controllers/Posts.ts
// controllers/Posts.ts
import express from "express";
import CustomRequest from "../types/custom";
import PostModel from "../db/prompt";

export const getAllPosts = async (req: CustomRequest, res: express.Response) => {
  try {
    const Posts = await PostModel.find();

    return res.status(200).json(Posts);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

// Other functions (createPost, deletePost, updatePost) should also use authorId and authorName consistently.

export const createPost = async (req: CustomRequest, res: express.Response) => {
  try {
    const { title, content, tags, authorId, authorName } = req.body;

    const Post = new PostModel({
      title,
      content,
      authorId,
      authorName,
      tags,
    });

    await Post.save();

    return res.status(201).json(Post);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const deletePost = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const Post = await PostModel.findOne({ _id: id });
    if (!Post) {
      return res.status(404).json({ message: "Post not found or unauthorized" });
    }

    await Post.remove();
    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const updatePost = async (req: CustomRequest, res: express.Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const Post = await PostModel.findOne({ _id: id });
    if (!Post) {
      return res.status(404).json({ message: "Post not found or unauthorized" });
    }

    Post.title = title;
    Post.content = content;
    await Post.save();

    return res.json(Post);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
