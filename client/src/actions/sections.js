export const CREATE_SECTION = 'CREATE_SECTION'
export const CREATE_DOCUMENT = 'CREATE_DOCUMENT'
export const LOAD_DOCUMENT = 'LOAD_DOCUMENT'

export function createSection(id, name) {
  return { type: CREATE_SECTION, id: id, name: name }
}

export function createDocument(section, uuid, name, blob = null) {
  return {
    type: CREATE_DOCUMENT,
    section: section,
    uuid: uuid,
    name: name,
    blob: blob,
  }
}

export function loadDocument(section, uuid, blob) {
  return {
    type: LOAD_DOCUMENT,
    section: section,
    uuid: uuid,
    blob: blob,
  }
}
