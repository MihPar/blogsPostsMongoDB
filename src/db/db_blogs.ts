import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

export type BlogsType = {
	id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
  }

const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
console.log(process.env.MONGO_URL)

export const client = new MongoClient(mongoURI)
export const db = client.db('bd')
export const blogsCollection = db.collection<BlogsType>('blogs')

export async function runDbBlogs() {
	try {
		await client.connect()
		await client.db('blogs').command({ping: 1})
		console.log('Connect successfully to mongoBlogs server')
	} catch {
		console.log('Cann`t to connect to db')
		await client.close()
	}
}