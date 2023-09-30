import { blogsCollection, BlogsType } from '../db/db';
import { postsCollection } from '../db/db';
import { PostsType } from '../db/db';

export const postsRepositories = {
  async findAllPosts(): Promise<PostsType[]> {
    const filtered: any = {};
    return postsCollection.find(filtered, {projection: {_id: 0}}).toArray();
  },
  async updatePost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<PostsType> {
	const blog: any = await blogsCollection.findOne({ id: blogId });
	// if(!blog) return null
	const newPost = {
		id: new Date().toISOString(),
		title,
		shortDescription,
		content,
		blogId,
		blogName: blog.name,
		createdAt: new Date().toISOString()
	}
	const post = await postsCollection.insertOne({...newPost})
	return newPost
  },
  async findPostId(id: string): Promise<PostsType | null> {
	const postId = await postsCollection.findOne({id: id}, {projection: {_id: 0}})
	return postId ? postId : null
  },
  async updatePostId(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
	const result = await postsCollection.updateOne({id: id}, {$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
	return result.upsertedCount === 1;
  }, 
  async deletePostId(id: string): Promise<boolean> {
	const deletePostId = await postsCollection.deleteOne({id: id})
	return deletePostId.deletedCount === 1
  },
  async deleteAllPosts(): Promise<boolean> {
	const deletedAll = await postsCollection.deleteMany({})
	return deletedAll.deletedCount === 1
  }
};
