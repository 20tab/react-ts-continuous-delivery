import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'

import * as ReactReduxHooks from '../../utils/hooks/redux'

configure({ adapter: new Adapter() })

describe('RecipeList', () => {
  let wrapper
  let useEffect
  let store

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f())
  }

  beforeEach(() => {
    store = configureStore()({
      recipies: [{ id: 1, title: 'Ice Cream' }, { id: 2, title: 'Soup Cream' }, { id: 3, title: 'Cream with fruits' }],
      isLoading: false,
      error: null
    })

    useEffect = jest.spyOn(React, 'useEffect')
    mockUseEffect() // important to do it twice
    mockUseEffect()

    jest
      .spyOn(ReactReduxHooks, 'useSelector')
      .mockImplementation(state => store.getState())

    jest
      .spyOn(ReactReduxHooks, 'useDispatch')
      .mockImplementation(() => store.dispatch)

    wrapper = shallow(<RecipeList store={store} />)
  })

  describe('on start', () => {
    it('dispatch search action to store', () => {
      const actions = store.getActions()
      expect(actions).toEqual([{ type: 'SEARCH', query: 'cream' }])
    })
  })

  it('should render RecipeItem components if gets recipies array from store', () => {
    expect(wrapper.find(RecipeItem)).toHaveLength(3)
  })
})
