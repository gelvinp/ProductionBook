class APIRequest {
  static async request(endpoint, auth) {
    console.log(`trying auth ${auth}`)
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'get',
        headers: {
          Authorization: `${auth}`
        }
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

  static async index(auth) {
    console.log(`trying auth ${auth}`)
    try {
      const response = await fetch(`/api`, {
        method: 'get',
        headers: {
          Authorization: `${auth}`
        }
      })
      if (response.ok) {
        const text = await response.text()
        console.log(text)
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
}

export default APIRequest
