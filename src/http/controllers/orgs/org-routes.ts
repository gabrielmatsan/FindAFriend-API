import { FastifyInstance } from 'fastify'

import { createOrgController } from './create-org.controller'
import { authenticateOrgController } from './authenticate.controller'
import { FetchNearbyOrgsController } from './fetch-nearby-orgs.controller'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgController)
  app.post('/orgs/authenticate', authenticateOrgController)
  app.get('/orgs/nearby', FetchNearbyOrgsController)
  app.patch('/token/refresh', refresh)

  /** Authenticated Routes */
}
