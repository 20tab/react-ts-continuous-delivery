import React from 'react'
import { setupServer } from 'msw/node'
import { shallow, ShallowWrapper } from 'enzyme'

import { LoginForm } from '../components/LoginForm'
import { findByTestAttr, wait } from './utils/functions'
import { createHandler } from './utils/createHandler'

const server = setupServer()
const setup = (props = {}) => shallow(<LoginForm {...props} />)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Login form renders without errors', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'form')
  expect(component.length).toBe(1)
})

describe('Login form renders inputs', () => {
  let wrapper: ShallowWrapper

  beforeAll(() => {
    wrapper = setup()
  })

  test('Renders username input', () => {
    const component = findByTestAttr(wrapper, 'username')
    expect(component.length).toBe(1)
  })

  test('Renders password input', () => {
    const component = findByTestAttr(wrapper, 'password')
    expect(component.length).toBe(1)
  })
})

describe('Typing on inputs will update values', () => {
  test('Typing on username input', async () => {
    const wrapper = setup()
    let input = findByTestAttr(wrapper, 'username')
    expect(input.text()).toBe('')

    const value = 'my_username'
    input.simulate('change', { target: { value } })
    input = findByTestAttr(wrapper, 'username')
    expect(input.prop('value')).toBe(value)
  })

  test('Typing on password input', () => {
    const wrapper = setup()
    const findInput = () => findByTestAttr(wrapper, 'password')
    let input = findInput()
    expect(input.text()).toBe('')

    const value = 'my_password'
    input.simulate('change', { target: { value } })
    input = findInput()
    expect(input.prop('value')).toBe(value)
  })
})

test('Login form renders submit button', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'button')
  expect(component.length).toBe(1)
})

test('On submit button click expect successfully login', async () => {
  // Add handler to server
  const handler = await createHandler({
    openapiDocumentPath: './__test__/contracts/1.0.0.yaml',
    method: 'post',
    statusCode: 200,
    baseUrl: process.env.API_URL,
    path: '/login'
  })

  server.use(handler)

  // Start test
  const wrapper = setup()
  const form = findByTestAttr(wrapper, 'form')

  form.simulate('submit', {
    preventDefault: jest.fn()
  })

  // Aspetto che tutte le promesse siano state risolte.
  await wait(10)

  wrapper.update()
  const message = findByTestAttr(wrapper, 'message')
  expect(message.text()).toBe('You logged in')
})

test('On submit button click expect failed login with Unauthorized error', async () => {
  // Add handler to server
  const handler = await createHandler({
    openapiDocumentPath: './__test__/contracts/1.0.0.yaml',
    method: 'post',
    statusCode: 401,
    baseUrl: process.env.API_URL,
    path: '/login'
  })

  server.use(handler)

  // Start test
  const wrapper = setup()
  const form = findByTestAttr(wrapper, 'form')

  form.simulate('submit', {
    preventDefault: jest.fn()
  })

  await wait(10)
  wrapper.update()
  const message = findByTestAttr(wrapper, 'message')
  expect(message.text()).toBe('Unauthorized')
})

test('On submit button click expect failed login with Generic error', async () => {
  // Add handler to server
  const handler = await createHandler({
    openapiDocumentPath: './__test__/contracts/1.0.0.yaml',
    method: 'post',
    statusCode: 400,
    baseUrl: process.env.API_URL,
    path: '/login'
  })

  server.use(handler)

  // Start test
  const wrapper = setup()
  const form = findByTestAttr(wrapper, 'form')

  form.simulate('submit', {
    preventDefault: jest.fn()
  })

  await wait(10)
  wrapper.update()
  const message = findByTestAttr(wrapper, 'message')
  expect(message.text()).toBe('Generic Error')
})
