import { OPEN_FILE, CLOSE_FILE, openFile, closeFile } from '../modals.js'

describe('modal actions', () => {
  it('should create an action to open the file modal', () => {
    const expectedAction = {
      type: OPEN_FILE,
    }
    expect(openFile()).toEqual(expectedAction)
  })

  it('should create an action to close the file modal', () => {
    const expectedAction = {
      type: CLOSE_FILE,
    }
    expect(closeFile()).toEqual(expectedAction)
  })
})
