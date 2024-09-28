import { Org } from '@prisma/client'

import type { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from './error/org-already-exists-error'
import { hash } from 'bcryptjs'

interface CreateOrgUseCaseRequest {
  name: string
  author_name: string
  email: string
  whatsapp: string
  password: string

  cep: string
  state: string
  city: string
  neighbohood: string
  street: string

  longitude: number
  latitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    author_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighbohood,
    street,
    longitude,
    latitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgByEmail = await this.orgsRepository.findByEmail(email)

    if (orgByEmail) throw new OrgAlreadyExistsError()

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      author_name,
      email,
      whatsapp,
      password: password_hash,
      cep,
      state,
      city,
      neighbohood,
      street,
      longitude,
      latitude,
    })

    return { org }
  }
}
