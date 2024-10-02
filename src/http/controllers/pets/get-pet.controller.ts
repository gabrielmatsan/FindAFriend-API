import { PetNotFoundError } from '@/use-cases/error/pet-not-found-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string(),
})

export async function getPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const getUseCase = makeGetPetUseCase()

  try {
    const pet = await getUseCase.execute({ id })

    return reply.status(200).send(pet)
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    console.error(err)
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}
