import { FastifyInstance } from 'fastify'

import { createOrgController } from './create-org.controller'
import { authenticateOrgController } from './authenticate.controller'
import { FetchNearbyOrgsController } from './fetch-nearby-orgs.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgController)
  app.post('/orgs/authenticate', authenticateOrgController)
  app.get('/orgs/nearby', FetchNearbyOrgsController)

  /** Authenticated Routes */
}
