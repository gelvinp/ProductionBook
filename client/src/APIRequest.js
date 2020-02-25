/*
 * TODO: Implement redux store for errors
 */

class APIRequest {
  static async login_request(loginInfo) {
    try {
      const response = await fetch(`/api/login`, {
        method: `post`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
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

  static async json_request(endpoint = '', method = 'get', body = {}) {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: `${method}`,
        credentials: 'same-origin',
        ...(Object.keys(body).length
          ? { headers: { 'Content-Type': 'application/json' } }
          : null),
        ...(Object.keys(body).length ? { body: JSON.stringify(body) } : {}),
      })
      if (response.ok) {
        const text = await response.text()
        const json = text.length ? JSON.parse(text) : {}
        return { data: json, error: false }
      } else {
        const text = await response.text()
        if (text === '{"expired":true}') {
          const refresh = await fetch('/api/refresh', { method: 'post' })
          if (refresh.ok) {
            const new_attempt = await this.json_request(endpoint, method, body)
            return new_attempt
          } else {
            return { error: true }
          }
        }
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
        credentials: 'same-origin',
      })
      if (response.ok) {
        const blob = await response.blob()
        return { data: blob, error: false }
      } else {
        const text = await response.text()
        if (text === '{"expired":true}') {
          const refresh = await fetch('/api/refresh', { method: 'post' })
          if (refresh.ok) {
            const new_attempt = await this.blob_request(endpoint)
            return new_attempt
          } else {
            return { error: true }
          }
        }
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
