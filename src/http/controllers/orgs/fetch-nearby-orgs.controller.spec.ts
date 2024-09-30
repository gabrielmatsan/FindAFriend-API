import { app } from '@/app'
import { makeOrg } from '@/tests/factories/make-org.factory'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'

describe('Fetch Nearby Orgs Controller E2E', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to fetch nearby orgs', async () => {
    const org = makeOrg()
    await request(app.server).post('/orgs').send(org).expect(201)

    const response = await request(app.server)
      .get('/orgs/nearby')
      .query({
        latitude: org.latitude,
        longitude: org.longitude,
      })
      .expect(200)
    expect(response.body.orgs).toHaveLength(1)
  })
})
