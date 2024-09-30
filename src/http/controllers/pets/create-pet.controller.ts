import { OrgNotFoundError } from '@/use-cases/error/org-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.coerce.number(),
  size: z.string(),
  environment: z.string(),
  energy_level: z.string(),
  org_id: z.string(),
})

export async function createPetsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = bodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const org_id = request.user.sub
  try {
    const { pet } = await createPetUseCase.execute({ ...body, org_id })

    return reply.status(201).send(pet)
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      console.error(error)
      return reply.status(404).send({ message: error.message })
    }
  }
}
