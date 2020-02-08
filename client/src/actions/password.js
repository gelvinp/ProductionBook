export const SET_PASSWORD = 'SET_PASSWORD'

export function setPassword(pass) {
  return { type: SET_PASSWORD, pass: pass }
}
