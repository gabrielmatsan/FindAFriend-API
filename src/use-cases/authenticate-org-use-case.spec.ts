import { beforeEach, describe, expect, it } from 'vitest'
import { makeOrg } from '../tests/factories/make-org.factory'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { AuthenticateOrgUseCase } from './authenticate-org-use-case'
import { InvalidCredentialsError } from './error/invalid-credentials-error'

describe('Authenticate Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: AuthenticateOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate an org', async () => {
    const password = '123456'

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 6) }),
    )

    const { org: authenticatedOrg } = await sut.execute({
      email: org.email,
      password: '123456',
    })

    expect(authenticatedOrg).toEqual(org)
  })

  it('shoud be not able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({ email: 'john@example.com', password: '123456' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate an org with wrong password', async () => {
    const password = '123456'

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 6) }),
    )

    await expect(() =>
      sut.execute({ email: org.email, password: 'wrongpass' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
