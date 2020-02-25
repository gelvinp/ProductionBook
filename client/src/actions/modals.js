export const OPEN_UPLOAD = 'OPEN_UPLOAD'
export const CLOSE_UPLOAD = 'CLOSE_UPLOAD'
export const OPEN_SECTION = 'OPEN_SECTION'
export const CLOSE_SECTION = 'CLOSE_SECTION'
export const OPEN_DOCUMENT = 'OPEN_DOCUMENT'
export const CLOSE_DOCUMENT = 'CLOSE_DOCUMENT'

export function openUpload() {
  return { type: OPEN_UPLOAD }
}

export function closeUpload() {
  return { type: CLOSE_UPLOAD }
}

export function openSection(section) {
  return { type: OPEN_SECTION, section: section }
}

export function closeSection() {
  return { type: CLOSE_SECTION }
}

export function openDocument(id, uuid) {
  return { type: OPEN_DOCUMENT, id: id, uuid: uuid }
}

export function closeDocument() {
  return { type: CLOSE_DOCUMENT }
}
