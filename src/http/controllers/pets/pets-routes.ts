import type { FastifyInstance } from 'fastify'
import { createPetsController } from './create-pet.controller'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { searchPetsController } from './search-pets.controller'
import { getPetController } from './get-pet.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', { onRequest: [verifyJwt] }, createPetsController)
  app.get('/orgs/pets', searchPetsController)
  app.get('/orgs/pets/:id', getPetController)
}
