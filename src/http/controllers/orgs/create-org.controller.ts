import { OrgAlreadyExistsError } from '@/use-cases/error/org-already-exists-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-creat-org-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createOrgController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighbohood: z.string(),
    street: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const body = createOrgBodySchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  try {
    const { org } = await createOrgUseCase.execute(body)

    return reply.status(201).send({ org })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
