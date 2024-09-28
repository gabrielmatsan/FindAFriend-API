import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'

type Overwrite = {
  password?: string
}

export function makeOrg(overwrite?: Overwrite) {
  return {
    id: randomUUID(),
    author_name: faker.person.fullName(),
    cep: faker.location.zipCode(),
    city: faker.location.city(),
    email: faker.internet.email(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    name: faker.company.name(),
    neighbohood: faker.location.streetAddress(),
    password: overwrite?.password ?? faker.internet.password(),
    state: faker.location.state(),
    street: faker.location.street(),
    whatsapp: faker.phone.number(),
  }
}
