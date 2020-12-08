import serverPromise from '../test-server'
import { TestClient, clearDatabase } from '../test-helpers'
import uuid from 'uuid/v4'
import hash from '../hash'

let server
let mockUser
let mockAdminUser
let mockNonAdminUser

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

// jest.setTimeout(70000)

beforeAll(async () => {
  server = await serverPromise
  mockUser = {
    email: `mock_user@gmail.com`,
    password: 'z'.repeat(64),
  }

  mockAdminUser = {
    email: 'user_admin@gmail.com',
    password: 'x'.repeat(64),
  }

  mockNonAdminUser = {
    email: 'user_non_admin@gmail.com',
    password: 'y'.repeat(64),
  }
})

afterEach(async () => {
  await clearDatabase(server)
})

describe('controllers/region', () => {
  describe('basic CRUD with JWT authorization', () => {
    let client
    let adminUser

    beforeEach(async () => {
      client = new TestClient({
        server,
      })

      // setting up admin user and token
      const userRes = await client.post(`/user/`, { ...mockAdminUser })
      adminUser = await userRes.json()

      let tokenRes = await client.post(`/user/token`, { ...mockAdminUser })
      const adminToken = await tokenRes.json()
      client.jwtAuth = `${adminToken['token']}`

      const user = await server.store.get(`user/${adminUser.id}`, false)
      if (!user) {
        throw new Error('user not found')
      }
      adminUser = { ...user, admin: true, emailValid: true }
      await server.store.replace(adminUser)
    })

    it('should be able to upsert a region as admin', async () => {
      const region = {
        region: 'BER',
        orchestrators: [
          { address: 'localhost:7935' },
          { address: 'localhost:7935' },
          { address: 'localhost:7935' },
          { address: 'localhost:7935' },
        ],
      }

      let res = await client.post(`/region/${region.region}`, { ...region })
      expect(res.status).toBe(200)

      let getResp = await client.get(`/region/${region.region}`)
      expect(getResp).toBeDefined()
      expect(getResp.status).toBe(200)
    })
  })
})
