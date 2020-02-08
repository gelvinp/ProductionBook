import store from './store'

/*
 * TODO: Implement redux store for errors
 */

class APIRequest {
  static async json_request(endpoint = '', method = 'get', body = {}) {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: `${method}`,
        headers: {
          Authorization: `${store.getState().password}`,
          ...(Object.keys(body).length
            ? { 'Content-Type': 'application/json' }
            : {}),
        },
        ...(Object.keys(body).length ? { body: JSON.stringify(body) } : {}),
      })
      if (response.ok) {
        const text = await response.text()
        const json = text.length ? JSON.parse(text) : {}
        return { data: json, error: false }
      } else {
        return { error: true }
      }
    } catch (err) {
      console.log('Error in API Request')
      console.log(err)
      return { error: true }
    }
  }

  static async blob_request(endpoint) {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'get',
        headers: {
          Authorization: `${store.getState().password}`,
        },
      })
      if (response.ok) {
        const blob = await response.blob()
        return { data: blob, error: false }
      } else {
        return { error: true }
      }
    } catch (err) {
      console.log('Error in API Request')
      console.log(err)
      return { error: true }
    }
  }
}

export default APIRequest
