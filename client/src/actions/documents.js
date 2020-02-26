export const SELECT_DOCUMENT = 'SELECT_DOCUMENT'
export const DOCUMENT_DELETED = 'DOCUMENT_DELETED'
export const SECTION_DELETED = 'SECTION_DELETED'

export function selectDocument(section = -1, uuid = -1) {
  return {
    type: SELECT_DOCUMENT,
    section: section,
    uuid: uuid,
  }
}

export function documentDeleted(section, uuid) {
  return {
    type: DOCUMENT_DELETED,
    section: section,
    uuid: uuid,
  }
}

export function sectionDeleted(section) {
  return {
    type: SECTION_DELETED,
    section: section,
  }
}
