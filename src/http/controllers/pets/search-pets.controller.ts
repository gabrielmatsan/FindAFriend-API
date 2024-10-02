import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const listQueryParamsSchema = z.object({
  city: z.string().min(1),
  age: z.coerce.number().optional(),
  size: z.string().optional(),
  energy_level: z.string().optional(),
  environment: z.string().optional(),
})

export async function searchPetsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { city, age, size, energy_level, environment } =
    listQueryParamsSchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  try {
    const { pets } = await searchPetsUseCase.execute({
      city,
      age,
      size,
      energy_level,
      environment,
    })
    return reply.status(200).send({ pets })
  } catch (err) {
    console.error(err)

    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}
