import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

export type ProductType = {
	id: number
	title: string
  }

const mongoURI = process.env.MONGO_URL || 'mongodb+srv://MihPar:MihPar1981@cluster0.e2lfxsd.mongodb.net/?retryWrites=true&w=majority'
console.log(process.env.MONGO_URL)

export const client = new MongoClient(mongoURI)
const db = client.db('shop')
export const productsCollection = db.collection<ProductType>('products')

export async function runDb() {
	try {
		await client.connect()
		await client.db('products').command({ping: 1})
		console.log('Connect successfully to mongo server')
	} catch {
		console.log('Cann`t to connect to db')
		await client.close()
	}
}