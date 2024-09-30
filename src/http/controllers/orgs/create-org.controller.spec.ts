import { app } from '@/app'
import { makeOrg } from '@/tests/factories/make-org.factory'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'

describe('Create Org Controller E2E', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be create an org', async () => {
    const response = await request(app.server).post('/orgs').send(makeOrg())

    expect(response.status).toBe(201)
  })
})
