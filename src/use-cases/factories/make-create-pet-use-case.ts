import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet-use-case'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeCreatePetUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new CreatePetUseCase(orgsRepository, petsRepository)

  return useCase
}
