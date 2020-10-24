import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Pact } from '@pact-foundation/pact'
import path from 'path'

configure({ adapter: new Adapter() })

export const provider = new Pact({
  consumer: 'react-ts-continuous-delivery_frontend',
  provider: 'react-ts-continuous-delivery_backend',
  log: path.resolve(`${process.cwd()}/__test__/pacts`, 'logs', 'pact.log'),
  logLevel: 'warn',
  dir: path.resolve(`${process.cwd()}/__test__/`, 'pacts'),
  spec: 2
})
