var Fetch = (function() {
  function _parseResponse(response, type) {
    switch (type) {
      case 'text':
        return response.text()
      case 'json':
        return response.json()
      case 'blob':
        return response.blob()
      case 'formData':
        return response.formData()
      case 'arrayBuffer':
        return response.arrayBuffer()
    }
  }

  function _handleHttpErrors(promise) {
    return promise
      .then(response => {
        if (response.ok) {
          return {promise, ok: true}
        }
        throw Error(response.status)
      })
      .catch(error => {
        const {message} = error
        return {
          error: {name: 'HttpError', message},
          ok: false,
        }
      })
  }

  function _handleStandardErrors(error) {
    const {name, message} = error
    return {
      error: {name, message},
      ok: false,
    }
  }

  const Public = {}

  Public.get = async function(url, option = {}, resType = 'json') {
    const {ok, promise, error} = await _handleHttpErrors(fetch(url, option))
    if (ok) {
      return promise
        .then(response => _parseResponse(response, resType))
        .then(data => ({data, ok: true}))
        .catch(_handleStandardErrors)
    }
    return {error, ok: false}
  }

  Public.post = async function(url, option, resType = 'json') {
    const {ok, promise, error} = await _handleHttpErrors(fetch(url, option))
    if (ok) {
      return promise
        .then(response => _parseResponse(response, resType))
        .then(data => ({data, ok: true}))
        .catch(_handleStandardErrors)
    }
    return {error, ok: false}
  }

  Public.put = async function(url, option, resType = 'text') {
    const {ok, promise, error} = await _handleHttpErrors(fetch(url, option))
    if (ok) {
      return promise
        .then(response => _parseResponse(response, resType))
        .then(data => ({data, ok: true}))
        .catch(_handleStandardErrors)
    }
    return {error, ok: false}
  }

  Public.delete = async function(
    url,
    option = {method: 'delete'},
    resType = 'text',
  ) {
    const {ok, promise, error} = await _handleHttpErrors(fetch(url, option))
    if (ok) {
      return promise
        .then(response => _parseResponse(response, resType))
        .then(data => ({data, ok: true}))
        .catch(_handleStandardErrors)
    }
    return {error, ok: false}
  }

  return Public
})()
