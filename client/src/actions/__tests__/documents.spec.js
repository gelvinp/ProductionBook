import { SELECT_DOCUMENT, selectDocument } from '../documents.js'

describe('document actions', () => {
  it('should create an action to select a document', () => {
    const section = 1
    const uuid = 2
    const expectedAction = {
      type: SELECT_DOCUMENT,
      section: section,
      uuid: uuid,
    }
    expect(selectDocument(section, uuid)).toEqual(expectedAction)
  })

  it('should create an action to deselect a document when malformed', () => {
    const malformedAction = {
      type: SELECT_DOCUMENT,
      section: -1,
      uuid: -1,
    }
    expect(selectDocument()).toEqual(malformedAction)
  })
})
