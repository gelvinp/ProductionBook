export const OPEN_UPLOAD = 'OPEN_UPLOAD'
export const CLOSE_UPLOAD = 'CLOSE_UPLOAD'

export function openUpload() {
  return { type: OPEN_UPLOAD }
}

export function closeUpload() {
  return { type: CLOSE_UPLOAD }
}
