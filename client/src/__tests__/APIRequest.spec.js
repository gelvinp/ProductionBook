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
    jest.spyOn(store.default, 'getState').mockImplementation(() => {
      return { password: 'test' }
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'test',
        headers: {
          Authorization: 'test',
        },
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
    jest.spyOn(store.default, 'getState').mockImplementation(() => {
      return { password: 'test' }
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/')
      expect(request).toStrictEqual({
        method: 'get',
        headers: {
          Authorization: 'test',
        },
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
    jest.spyOn(store.default, 'getState').mockImplementation(() => {
      return { password: 'test' }
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'test',
        headers: {
          Authorization: 'test',
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
    jest.spyOn(store.default, 'getState').mockImplementation(() => {
      return { password: 'test' }
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'test',
        headers: {
          Authorization: 'test',
        },
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
    })
    jest.spyOn(store.default, 'getState').mockImplementation(() => {
      return { password: 'test' }
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'test',
        headers: {
          Authorization: 'test',
        },
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
    jest.spyOn(store.default, 'getState').mockImplementation(() => {
      return { password: 'test' }
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'test',
        headers: {
          Authorization: 'test',
        },
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
    jest.spyOn(store.default, 'getState').mockImplementation(() => {
      return { password: 'test' }
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'get',
        headers: {
          Authorization: 'test',
        },
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
    })
    jest.spyOn(store.default, 'getState').mockImplementation(() => {
      return { password: 'test' }
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'get',
        headers: {
          Authorization: 'test',
        },
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
    jest.spyOn(store.default, 'getState').mockImplementation(() => {
      return { password: 'test' }
    })
    jest.spyOn(global, 'fetch').mockImplementation((endpoint, request) => {
      expect(endpoint).toBe('/api/test')
      expect(request).toStrictEqual({
        method: 'get',
        headers: {
          Authorization: 'test',
        },
      })
      return mockFetchPromise
    })
    return APIRequest.blob_request('test').then(json => {
      expect(json).toStrictEqual({ error: true })
    })
  })
})
