import store from '../store.js'

describe('createStore', () => {
  it('should initialize correctly', () => {
    expect(store).toMatchSnapshot()
    expect(store.getState()).toMatchSnapshot()
  })
})
