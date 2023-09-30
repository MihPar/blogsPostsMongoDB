import { HTTP_STATUS } from '../src/utils';
import { createApp } from './../src/index';
import request from 'supertest'

const app = createApp()
describe('/test blogs and post on MongoDB', () => {

	it('should return 200 and ampty array', async () => {
		await request(app)
		.get('/blogs')
		.expect(HTTP_STATUS.OK_200, [])
	})

	afterAll(function(done) {
		done()
	})
})