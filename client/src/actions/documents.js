export const SELECT_DOCUMENT = 'SELECT_DOCUMENT'

export function selectDocument(section = -1, uuid = -1) {
  return {
    type: SELECT_DOCUMENT,
    section: section,
    uuid: uuid,
  }
}
