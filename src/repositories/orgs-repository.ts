import type { Org, Prisma } from '@prisma/client'

export interface findManyNearbyParams {
  latitude: number
  longitude: number
}

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
  findManyNearby(params: findManyNearbyParams): Promise<Org[]>
}
