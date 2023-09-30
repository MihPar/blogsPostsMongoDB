import { HTTP_STATUS } from '../src/utils';
import { createApp } from './../src/index';
import request from 'supertest'

const app = createApp()

describe('/test blogs and post on MongoDB', () => {

	it('should return 1', async () => {
		expect(1).toBe(1)
	})

	// it('should return 200 and ampty array', async () => {
	// 	await request(app)
	// 	.get('/blogs')
	// 	.expect(HTTP_STATUS.OK_200, [])
	// })

	// it('should create new blogs', async () => {
	// 	const data = {
	// 		title: "Car",
	// 		shortDescription: "go by car",
	// 		content: "It is cool car",
	// 		blogId: "1"
	// 	}
	// 	await request(app)
	// 	.post('/blogs')
	// 	.send(data)
	// 	.expect(HTTP_STATUS.CREATED_201)
	// })
	
	// let createNewBlogs: any = null
	// it('should get any blogs by id', async () => {
	// 	await request(app)
	// 	.get('/blogs/1')
	// 	expect(HTTP_STATUS.OK_200)
	// })

	afterAll(function(done) {
		done()
	})
})