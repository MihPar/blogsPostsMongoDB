import { db } from './db_blogs';
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

export type PostsType = {
	id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
  }

const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
console.log(process.env.MONGO_URL)

export const client = new MongoClient(mongoURI)

export const postsCollection = db.collection<PostsType>('posts')

export async function runDbPosts() {
	try {
		await client.connect()
		await client.db('posts').command({ping: 1})
		console.log('Connect successfully to mongo server')
	} catch {
		console.log('Cann`t to connect to db')
		await client.close()
	}
}