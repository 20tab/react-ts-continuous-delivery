import axios from 'axios'
import adapter from 'axios/lib/adapters/http'
import { eachLike, like } from '@pact-foundation/pact/dsl/matchers'
import { provider } from '../setup'

axios.defaults.adapter = adapter

describe('API Pact test', () => {
  beforeAll(() => provider.setup())
  afterEach(() => provider.verify())
  afterAll(() => provider.finalize())
  describe('get planned task list', () => {
    test('planned tasks exist', async () => {
      // set up Pact interactions
      await provider.addInteraction({
        state: 'planned tasks exist',
        uponReceiving: 'get planned task list',
        withRequest: {
          method: 'GET',
          path: '/api/v2/projects/plannedtask/',
          headers: {
            'X-CSRFToken': like('GobO8MkFvzxFDSsQtooUdTsGFvJon1J7osep8vdxQ5MhNhjXZiLLSi7QiNAJZwU6')
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: eachLike({
            creation_datetime: '2020-07-27T13:06:31.887460',
            description: '',
            id: 1,
            notes: '',
            order: 211,
            start: '2020-07-27T13:05:00',
            stop: '2020-07-27T20:05:00',
            user: 13
          })
        }
      })

      // make request to Pact mock server
      const plannedTask = await axios.get(`${provider.mockService.baseUrl}/api/v2/projects/plannedtask/`, {
        headers: {
          'X-CSRFToken': 'GobO8MkFvzxFDSsQtooUdTsGFvJon1J7osep8vdxQ5MhNhjXZiLLSi7QiNAJZwU6',
          'Content-Type': 'application/json'
        }
      })

      expect(plannedTask.data).toStrictEqual([
        {
          creation_datetime: '2020-07-27T13:06:31.887460',
          description: '',
          id: 1,
          notes: '',
          order: 211,
          start: '2020-07-27T13:05:00',
          stop: '2020-07-27T20:05:00',
          user: 13
        }
      ])
    })
  })
})
