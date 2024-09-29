import type { Pet, Prisma } from '@prisma/client'

export interface FindAllParams {
  city: string
  age?: number
  size?: string
  energy_level?: string
  environment?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findAll(data: FindAllParams): Promise<Pet[]>
}
