import { makeFetchNearbyOrgsUseCase } from '@/use-cases/factories/make-fetch-nearby-orgs-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
  latitude: z.coerce.number().refine((value) => {
    return (
      Math.abs(value) <= 90,
      {
        message: 'Latitude must be between -90 and 90',
      }
    )
  }),
  longitude: z.coerce.number().refine((value) => {
    return (
      Math.abs(value) <= 180,
      {
        message: 'Longitude must be between -180 and 180',
      }
    )
  }),
})

export async function FetchNearbyOrgsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const query = querySchema.parse(request.query)

  const fetchNearbyOrgsUseCase = makeFetchNearbyOrgsUseCase()

  try {
    const { orgs } = await fetchNearbyOrgsUseCase.execute({
      userLatitude: query.latitude,
      userLongitude: query.longitude,
    })

    return reply.status(200).send({ orgs })
  } catch (error) {
    console.log(error)

    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}
