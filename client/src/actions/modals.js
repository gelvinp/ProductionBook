export const OPEN_FILE = 'OPEN_FILE'
export const CLOSE_FILE = 'CLOSE_FILE'

export function openFile() {
  return { type: OPEN_FILE }
}

export function closeFile() {
  return { type: CLOSE_FILE }
}
