import { blogsCollection } from "../db/db";
import { BlogsType } from "../db/db";

export const blogsRepositories = {
  async findAllBlogs(): Promise<BlogsType[]> {
    const filtered: any = {};
    return blogsCollection.find(filtered).toArray();
  },
  async createNewBlog(
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<BlogsType> {
    const newBlog = {
      id: new Date().toISOString(),
      name,
      description,
      websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: true,
    };
    const result = await blogsCollection.insertOne(newBlog);
    return newBlog;
  },
  async findBlogId(id: string): Promise<BlogsType | null> {
    const blogId = await blogsCollection.findOne({ id: id });
    return blogId ? blogId : null;
  },
  async updateBlogId(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    const result = await blogsCollection.updateOne(
      { id: id },
      { $set: { name: name, description: description, websiteUrl: websiteUrl } }
    );
    return result.upsertedCount === 1;
  },
  async deleteId(id: string): Promise<boolean> {
	const deleteBlogId = await blogsCollection.deleteOne({id: id})
	return deleteBlogId.deletedCount === 1
  },
  async deleteAllBlogs(): Promise<boolean> {
	const deletedAll = await blogsCollection.deleteMany({})
	return deletedAll.deletedCount === 1
  }
};
