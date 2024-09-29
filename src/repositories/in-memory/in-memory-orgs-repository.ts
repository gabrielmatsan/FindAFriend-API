import { Org, Prisma } from '@prisma/client'
import type { findManyNearbyParams, OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      author_name: data.author_name,
      email: data.email,
      whatsapp: data.whatsapp,
      password: data.password,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighbohood: data.neighbohood,
      street: data.street,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = await this.items.find((item) => item.email === email)

    if (!org) return null

    return org
  }

  async findById(id: string) {
    const org = await this.items.find((item) => item.id === id)

    if (!org) return null

    return org
  }

  async findManyNearby(params: findManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10 // under than 10 km
    })
  }
}
