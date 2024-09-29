import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-reposiroty'
import { makePet } from '@/tests/factories/make-pet.factory'
import { describe, beforeEach, it, expect } from 'vitest'
import { GetPetUseCase } from './get-pet-use-case'
import { PetNotFoundError } from './error/pet-not-found-error'

describe('Get Pet Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a new pet', async () => {
    const pet = await petsRepository.create(makePet())
    const result = await sut.execute({ id: pet.id })

    expect(result.pet).toEqual(pet)
  })
  it('should not be able to get a non-existing pet', async () => {
    await expect(sut.execute({ id: 'invalid-id' })).rejects.toBeInstanceOf(
      PetNotFoundError,
    )
  })
})
