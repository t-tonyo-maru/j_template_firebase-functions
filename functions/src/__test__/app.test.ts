import request from 'supertest'
// app
import { app } from '@/app'

test('get /', () => {
  return request(app)
    .get('/')
    .then((response) => {
      expect(response.status).toEqual(200)
      expect(response.text).toEqual('hello express API')
    })
})
