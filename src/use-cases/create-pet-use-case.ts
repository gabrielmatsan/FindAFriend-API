import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '@prisma/client'
import { OrgNotFoundError } from './error/org-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: number
  size: string
  energy_level: string
  org_id: string
  environment: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    environment,
    energy_level,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      environment,
      org_id,
    })

    return { pet }
  }
}
