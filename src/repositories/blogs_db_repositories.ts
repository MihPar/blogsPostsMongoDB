import { blogsCollection } from '../db/db_blogs';
import { BlogsType } from '../db/db_blogs';

export const blogsRepositories = {
	async findAllBlogs(): Promise<BlogsType[]> {
		const filtered: any = {}
		return blogsCollection.find(filtered).toArray()
	},
	async createNewBlog(name: string, description: string, websiteUrl: string): Promise<BlogsType> {
		const newBlog = {
			id: new Date().toISOString(),
			name,
			description,
			websiteUrl,
			createdAt: new Date().toISOString(),
			isMembership: true
		}
		const result = await blogsCollection.insertOne(newBlog)
		return newBlog
	}
}