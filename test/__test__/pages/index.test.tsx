import React from 'react'
import { shallow } from 'enzyme'
import Home from '../../pages/index'
import { findByTestAttr } from '../utils/testUtils'

/**
  * Factory function to create a ShallowWrapper for the App component.
  * @function setup
  * @param {object} props - Component props specific to this setup.
  * @returns {ShallowWrapper}
  */
const setup = (props = {}) => {
  return shallow(<Home {...props} />)
}

test('renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'home-container')
  expect(component.length).toBe(1)
})
