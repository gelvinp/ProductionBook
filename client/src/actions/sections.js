export const CREATE_SECTION = 'CREATE_SECTION'
export const CREATE_DOCUMENT = 'CREATE_DOCUMENT'
export const LOAD_DOCUMENT = 'LOAD_DOCUMENT'
export const RENAME_SECTION = 'RENAME_SECTION'
export const DELETE_SECTION = 'DELETE_SECTION'
export const RENAME_DOCUMENT = 'RENAME_DOCUMENT'
export const MOVE_DOCUMENT = 'MOVE_DOCUMENT'
export const DELETE_DOCUMENT = 'DELETE_DOCUMENT'

export function createSection(id, name) {
  return { type: CREATE_SECTION, id: id, name: name }
}

export function renameSection(id, name) {
  return { type: RENAME_SECTION, id: id, name: name }
}

export function deleteSection(id) {
  return { type: DELETE_SECTION, id: id }
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

export function renameDocument(id, uuid, name) {
  return { type: RENAME_DOCUMENT, id: id, uuid: uuid, name: name }
}

export function moveDocument(id, uuid, newID) {
  return { type: MOVE_DOCUMENT, id: id, uuid: uuid, newID: newID }
}

export function deleteDocument(id, uuid) {
  return { type: DELETE_DOCUMENT, id: id, uuid: uuid }
}
