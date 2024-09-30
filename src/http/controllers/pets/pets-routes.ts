import type { FastifyInstance } from 'fastify'
import { createPetsController } from './create-pet.controller'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', { onRequest: [verifyJwt] }, createPetsController)
}
