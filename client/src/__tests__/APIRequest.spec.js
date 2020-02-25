import APIRequest from '../APIRequest'
const store = require('../store.js')

describe('APIRequest', () => {
  it('Returns a successful json_request with no body', () => {
    const mockSuccessfulResponse = {
      testing: true,
    }
    const mockTextPromise = Promise.resolve(
      JSON.stringify(mockSuccessfulResponse)
    )
    const mockFetchPromise = Promise.resolve({
      ok: true,
      text: () => mockTextPromise,
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'test',
        credentials: 'same-origin',
      })
      return mockFetchPromise
    })
    return APIRequest.json_request('test', 'test').then(json => {
      expect(json).toStrictEqual({ data: mockSuccessfulResponse, error: false })
    })
  })

  it('Returns a successful json_request with no params', () => {
    const mockSuccessfulResponse = {
      testing: true,
    }
    const mockTextPromise = Promise.resolve(
      JSON.stringify(mockSuccessfulResponse)
    )
    const mockFetchPromise = Promise.resolve({
      ok: true,
      text: () => mockTextPromise,
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/')
      expect(request).toStrictEqual({
        method: 'get',
        credentials: 'same-origin',
      })
      return mockFetchPromise
    })
    return APIRequest.json_request().then(json => {
      expect(json).toStrictEqual({ data: mockSuccessfulResponse, error: false })
    })
  })

  it('Returns a successful json_request with a body', () => {
    const mockSuccessfulResponse = {
      testing: true,
    }
    const mockTextPromise = Promise.resolve(
      JSON.stringify(mockSuccessfulResponse)
    )
    const mockFetchPromise = Promise.resolve({
      ok: true,
      text: () => mockTextPromise,
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'test',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: true }),
      })
      return mockFetchPromise
    })
    return APIRequest.json_request('test', 'test', { test: true }).then(
      json => {
        expect(json).toStrictEqual({
          data: mockSuccessfulResponse,
          error: false,
        })
      }
    )
  })

  it('Returns a successful empty json_request with no body', () => {
    const mockTextPromise = Promise.resolve('')
    const mockFetchPromise = Promise.resolve({
      ok: true,
      text: () => mockTextPromise,
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'test',
        credentials: 'same-origin',
      })
      return mockFetchPromise
    })
    return APIRequest.json_request('test', 'test').then(json => {
      expect(json).toStrictEqual({ data: {}, error: false })
    })
  })

  it('Returns a failed json_request with no body', () => {
    const mockFetchPromise = Promise.resolve({
      ok: false,
      text: () => Promise.resolve(''),
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'test',
        credentials: 'same-origin',
      })
      return mockFetchPromise
    })
    return APIRequest.json_request('test', 'test').then(json => {
      expect(json).toStrictEqual({ error: true })
    })
  })

  it('Catches an invalid json_request with no body', () => {
    const mockTextPromise = Promise.resolve('Hello! This should fail!')
    const mockFetchPromise = Promise.resolve({
      ok: true,
      text: () => mockTextPromise,
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'test',
        credentials: 'same-origin',
      })
      return mockFetchPromise
    })
    return APIRequest.json_request('test', 'test').then(json => {
      expect(json).toStrictEqual({ error: true })
    })
  })

  it('Returns a successful blob_request', () => {
    const blob = new Blob(['a'.repeat(1024)], { type: 'application/pdf' })
    const mockBlobPromise = Promise.resolve(blob)
    const mockFetchPromise = Promise.resolve({
      ok: true,
      blob: () => mockBlobPromise,
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'get',
        credentials: 'same-origin',
      })
      return mockFetchPromise
    })
    return APIRequest.blob_request('test').then(json => {
      expect(json).toStrictEqual({ data: blob, error: false })
    })
  })

  it('Returns a failed blob_request', () => {
    const mockFetchPromise = Promise.resolve({
      ok: false,
      text: () => Promise.resolve(''),
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'get',
        credentials: 'same-origin',
      })
      return mockFetchPromise
    })
    return APIRequest.blob_request('test').then(json => {
      expect(json).toStrictEqual({ error: true })
    })
  })

  it('Catches an invalid blob_request', () => {
    expect.assertions(3)
    const mockBlobPromise = Promise.reject()
    const mockFetchPromise = Promise.resolve({
      ok: true,
      blob: () => mockBlobPromise,
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'get',
        credentials: 'same-origin',
      })
      return mockFetchPromise
    })
    return APIRequest.blob_request('test').then(json => {
      expect(json).toStrictEqual({ error: true })
    })
  })

  it('Logs in successfully', () => {
    const mockSuccessfulResponse = {
      testing: true,
    }
    const mockTextPromise = Promise.resolve(
      JSON.stringify(mockSuccessfulResponse)
    )
    const mockFetchPromise = Promise.resolve({
      ok: true,
      text: () => mockTextPromise,
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/login')
      expect(request).toStrictEqual({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true }),
      })
      return mockFetchPromise
    })
    return APIRequest.login_request({ test: true }).then(json => {
      expect(json).toStrictEqual({ data: mockSuccessfulResponse, error: false })
    })
  })

  it('Handles a blank login', () => {
    const mockTextPromise = Promise.resolve('')
    const mockFetchPromise = Promise.resolve({
      ok: true,
      text: () => mockTextPromise,
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/login')
      expect(request).toStrictEqual({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true }),
      })
      return mockFetchPromise
    })
    return APIRequest.login_request({ test: true }).then(json => {
      expect(json).toStrictEqual({ data: {}, error: false })
    })
  })

  it('Handles a failed login', () => {
    const mockFetchPromise = Promise.resolve({
      ok: false,
      text: () => mockTextPromise,
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/login')
      expect(request).toStrictEqual({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true }),
      })
      return mockFetchPromise
    })
    return APIRequest.login_request({ test: true }).then(json => {
      expect(json).toStrictEqual({ error: true })
    })
  })

  it('Catches an invalid login', () => {
    const mockTextPromise = Promise.resolve('This will fail!')
    const mockFetchPromise = Promise.resolve({
      ok: true,
      text: () => mockTextPromise,
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/login')
      expect(request).toStrictEqual({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true }),
      })
      return mockFetchPromise
    })
    return APIRequest.login_request({ test: true }).then(json => {
      expect(json).toStrictEqual({ error: true })
    })
  })

  it('Successfully refreshes a json_request', () => {
    const mockSuccessfulResponse = {
      testing: true,
    }
    const mockTextPromise = Promise.resolve(
      JSON.stringify(mockSuccessfulResponse)
    )
    const mockFetchPromise = Promise.resolve({
      ok: true,
      text: () => mockTextPromise,
    })
    const expiredFetchPromise = Promise.resolve({
      ok: false,
      text: () => Promise.resolve('{"expired":true}'),
    })
    const refreshFetchPromise = Promise.resolve({
      ok: true,
    })
    let stage = 0
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      switch (stage) {
        case 0:
          expect(endpoint).toBe('/api/test')
          expect(request).toStrictEqual({
            method: 'test',
            credentials: 'same-origin',
          })
          stage++
          return expiredFetchPromise
        case 1:
          expect(endpoint).toBe('/api/refresh')
          expect(request).toStrictEqual({
            method: 'post',
          })
          stage++
          return refreshFetchPromise
        case 2:
          expect(endpoint).toBe('/api/test')
          expect(request).toStrictEqual({
            method: 'test',
            credentials: 'same-origin',
          })
          return mockFetchPromise
      }
    })
    return APIRequest.json_request('test', 'test').then(json => {
      expect(json).toStrictEqual({ data: mockSuccessfulResponse, error: false })
    })
  })

  it('Handles a unsuccessful refresh of a json request', () => {
    const expiredFetchPromise = Promise.resolve({
      ok: false,
      text: () => Promise.resolve('{"expired":true}'),
    })
    const refreshFetchPromise = Promise.resolve({
      ok: false,
    })
    let stage = 0
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      switch (stage) {
        case 0:
          expect(endpoint).toBe('/api/test')
          expect(request).toStrictEqual({
            method: 'test',
            credentials: 'same-origin',
          })
          stage++
          return expiredFetchPromise
        case 1:
          expect(endpoint).toBe('/api/refresh')
          expect(request).toStrictEqual({
            method: 'post',
          })
          return refreshFetchPromise
      }
    })
    return APIRequest.json_request('test', 'test').then(json => {
      expect(json).toStrictEqual({ error: true })
    })
  })

  it('Successfully refreshes a blob_request', () => {
    const blob = new Blob(['a'.repeat(1024)], { type: 'application/pdf' })
    const mockBlobPromise = Promise.resolve(blob)
    const mockFetchPromise = Promise.resolve({
      ok: true,
      blob: () => mockBlobPromise,
    })
    const expiredFetchPromise = Promise.resolve({
      ok: false,
      text: () => Promise.resolve('{"expired":true}'),
    })
    const refreshFetchPromise = Promise.resolve({
      ok: true,
    })
    let stage = 0
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      switch (stage) {
        case 0:
          expect(endpoint).toBe('/api/test')
          expect(request).toStrictEqual({
            method: 'get',
            credentials: 'same-origin',
          })
          stage++
          return expiredFetchPromise
        case 1:
          expect(endpoint).toBe('/api/refresh')
          expect(request).toStrictEqual({
            method: 'post',
          })
          stage++
          return refreshFetchPromise
        case 2:
          expect(endpoint).toBe('/api/test')
          expect(request).toStrictEqual({
            method: 'get',
            credentials: 'same-origin',
          })
          return mockFetchPromise
      }
    })
    return APIRequest.blob_request('test').then(json => {
      expect(json).toStrictEqual({ data: blob, error: false })
    })
  })

  it('Handles a unsuccessful refresh of a json request', () => {
    const expiredFetchPromise = Promise.resolve({
      ok: false,
      text: () => Promise.resolve('{"expired":true}'),
    })
    const refreshFetchPromise = Promise.resolve({
      ok: false,
    })
    let stage = 0
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      switch (stage) {
        case 0:
          expect(endpoint).toBe('/api/test')
          expect(request).toStrictEqual({
            method: 'get',
            credentials: 'same-origin',
          })
          stage++
          return expiredFetchPromise
        case 1:
          expect(endpoint).toBe('/api/refresh')
          expect(request).toStrictEqual({
            method: 'post',
          })
          return refreshFetchPromise
      }
    })
    return APIRequest.blob_request('test').then(json => {
      expect(json).toStrictEqual({ error: true })
    })
  })
})
