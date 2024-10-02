import request from 'supertest'

import { app } from '@/app'
import { makeOrg } from '@/tests/factories/make-org.factory'

describe('Refresh Token Org E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({
        email: org.email,
        password: org.password,
      })

    const cookies = authResponse.get('Set-Cookie')

    if (!cookies) {
      throw new Error()
    }

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()
    expect(response.statusCode).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
