import { InvalidCredentialsError } from '@/use-cases/error/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-org-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function authenticateOrgController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = bodySchema.parse(request.body)

  const createAuthenticateUseCase = makeAuthenticateUseCase()

  try {
    const { org } = await createAuthenticateUseCase.execute(body)

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
