import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-reposiroty'
import { makePet } from '@/tests/factories/make-pet.factory'
import { describe, beforeEach, it, expect } from 'vitest'
import { SearchPetsUseCase } from './search-pets-use-case'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { makeOrg } from '@/tests/factories/make-org.factory'

describe('Search Pet Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: SearchPetsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org.id }))

    await petsRepository.create(makePet({ org_id: org.id }))

    const org2 = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org2.id }))

    const { pets } = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: org2.city })

    expect(pets2).toHaveLength(1)
  })

  it('should be able to search pets by city and age', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org.id, age: 1 }))

    await petsRepository.create(makePet({ org_id: org.id, age: 2 }))

    const { pets } = await sut.execute({ city: org.city, age: 1 })

    // org 2

    const org2 = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org2.id, age: 1 }))

    const { pets: pets2 } = await sut.execute({ city: org2.city, age: 2 })

    expect(pets).toHaveLength(1) // 2 pets, only 1 with the age chosen

    expect(pets2).toHaveLength(0) // 1 pet, none with the age chosen
  })

  it('should be able to search pets by city and size', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org.id, size: 'medium' }))

    await petsRepository.create(makePet({ org_id: org.id, size: 'small' }))

    const { pets } = await sut.execute({ city: org.city, size: 'medium' })

    // org 2

    const org2 = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: org2.id, size: 'small' }))

    const { pets: pets2 } = await sut.execute({
      city: org2.city,
      size: 'large',
    })

    expect(pets).toHaveLength(1) // 2 pets, only with the size chosen

    expect(pets2).toHaveLength(0) // 1 pet, none with the size chosen
  })

  it('should be able to search pets by city and environment', async () => {
    const org = await orgsRepository.create(makeOrg())

    await petsRepository.create(
      makePet({ org_id: org.id, environment: 'indoor' }),
    )

    await petsRepository.create(
      makePet({ org_id: org.id, environment: 'outdoor' }),
    )
    console.log(org.city)

    const { pets } = await sut.execute({
      city: org.city,
      environment: 'outdoor',
    })
    expect(pets).toHaveLength(1) // 2 pets, only with the environment chosen
  })
})
