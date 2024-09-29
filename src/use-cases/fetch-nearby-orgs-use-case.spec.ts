import type { OrgsRepository } from '@/repositories/orgs-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { FetchNearbyOrgsUseCase } from './fetch-nearby-orgs-use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { makeOrg } from '@/tests/factories/make-org.factory'

describe('Fetch Nearby Org Use Case', () => {
  let orgsRepository: OrgsRepository
  let sut: FetchNearbyOrgsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchNearbyOrgsUseCase(orgsRepository)
  })

  it('should be able to locate nearby orgs', async () => {
    const org = await orgsRepository.create(makeOrg())

    const nearbyOrgs = await sut.execute({
      userLatitude: org.latitude.toNumber(),
      userLongitude: org.longitude.toNumber(),
    })

    expect(nearbyOrgs.orgs).toHaveLength(1)
    expect(nearbyOrgs.orgs).toEqual([org])
  })
})
