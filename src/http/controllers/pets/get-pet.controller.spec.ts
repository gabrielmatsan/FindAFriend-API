import { app } from '@/app'
import { makeOrg } from '@/tests/factories/make-org.factory'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'
import { makePet } from '@/tests/factories/make-pet.factory'

describe('Get Pet Controller E2E', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to find a pet by id', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password })

    const response = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ org_id: org.id }))

    const getResponse = await request(app.server)
      .get(`/orgs/pets/${response.body.id}`)
      .set('Authorization', `Bearer ${authResponse.body.token}`)

    expect(getResponse.status).toBe(200)
  })
})
