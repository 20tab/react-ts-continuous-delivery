import { ShallowWrapper } from 'enzyme'

/**
 * Return node(s) with the given data-test attribute.
 */
export const findByTestAttr = (wrapper: ShallowWrapper, attrValue: string): ShallowWrapper => {
  return wrapper.find(`[data-test='${attrValue}']`)
}

/**
 * Wait for `ms` milliseconds.
 */
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
