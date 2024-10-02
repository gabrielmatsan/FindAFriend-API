import { app } from '@/app'
import { makeOrg } from '@/tests/factories/make-org.factory'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'
import { makePet } from '@/tests/factories/make-pet.factory'

describe('Search Pets Controller E2E', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to find pets by city', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ org_id: org.id }))

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ org_id: org.id }))

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should not be able to find pets without city ', async () => {
    const response = await request(app.server).get('/orgs/pets')

    expect(response.status).toBe(400)
  })

  it('should be able to find pets by city and age', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ org_id: org.id, age: 10 }))

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ org_id: org.id, age: 15 }))

    // Faz a requisição para buscar pets pela cidade e idade
    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city, age: 10 })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })
  it('should not be able to find pets without city ', async () => {
    const response = await request(app.server).get('/orgs/pets')

    expect(response.status).toBe(400)
  })

  it('should be able to find pets by city and size', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ org_id: org.id, size: 'large' }))

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ org_id: org.id, size: 'small' }))

    // Faz a requisição para buscar pets pela cidade e idade
    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city, size: 'small' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to find pets by city and energy level', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ org_id: org.id, energy_level: 'high' }))

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ org_id: org.id, energy_level: 'low' }))

    // Faz a requisição para buscar pets pela cidade e idade
    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city, energy_level: 'low' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to find pets by city and environment', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ org_id: org.id, environment: 'outdoor' }))

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ org_id: org.id, environment: 'indoor' }))

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city, environment: 'indoor' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to find pets by city and many other filters', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(
        makePet({
          org_id: org.id,
          environment: 'outdoor',
          size: 'small',
          energy_level: 'high',
          age: 10,
        }),
      )

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(
        makePet({
          org_id: org.id,
          environment: 'indoor',
          size: 'large',
          energy_level: 'low',
          age: 15,
        }),
      )

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(
        makePet({
          org_id: org.id,
          environment: 'indoor',
          size: 'medium',
          energy_level: 'medium',
          age: 5,
        }),
      )

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(
        makePet({
          org_id: org.id,
          environment: 'indoor',
          size: 'large',
          energy_level: 'high',
          age: 8,
        }),
      )

    const response = await request(app.server).get('/orgs/pets').query({
      city: org.city,
      environment: 'indoor',
      size: 'large',
      energy_level: 'low',
      age: 15,
    })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets[0].environment).toBe('indoor')
    expect(response.body.pets[0].size).toBe('large')
    expect(response.body.pets[0].energy_level).toBe('low')
    expect(response.body.pets[0].age).toBe(15)
  })
})
