import axios from 'axios'
import adapter from 'axios/lib/adapters/http'
import { like } from '@pact-foundation/pact/dsl/matchers'
import { provider } from '../setup'

axios.defaults.adapter = adapter

describe('API Pact test', () => {
  beforeAll(() => provider.setup())
  afterEach(() => provider.verify())
  afterAll(() => provider.finalize())
  describe('show user name on home page', () => {
    test('get user name', async () => {
      // set up Pact interactions
      await provider.addInteraction({
        state: 'get user name',
        uponReceiving: 'show user name on home page',
        withRequest: {
          method: 'GET',
          path: '/api/user/',
          headers: {
            'X-CSRFToken': like('GobO8MkFvzxFDSsQtooUdTsGFvJon1J7osep8vdxQ5MhNhjXZiLLSi7QiNAJZwU6')
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: like({
            name: 'John Doe'
          })
        }
      })

      // make request to Pact mock server
      const plannedTask = await axios.get(`${provider.mockService.baseUrl}/api/user/`, {
        headers: {
          'X-CSRFToken': 'GobO8MkFvzxFDSsQtooUdTsGFvJon1J7osep8vdxQ5MhNhjXZiLLSi7QiNAJZwU6',
          'Content-Type': 'application/json'
        }
      })

      expect(plannedTask.data).toStrictEqual(
        {
          name: 'John Doe'
        }
      )
    })
  })
})
