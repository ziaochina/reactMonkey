 
/**
* Helper Functions that return a function that send a fetch request
* The promise returned by fetch is then resolved in the fetch wrapper (fetch-wrapper.js)
**/

/**
* Create an authenticated POST request
*
* @param {string} - url
* @param {object} - data (request body)
* @param {string} - token (for authentication)
* @param {object} - header - optionally pass in further header options
*
**/

export const postAuthReq = (url, data, token, header) => {
  return () => fetch(url, post(reqOptions(data, {...header, ...authHeader(token)})));
}

/**
* Create an authenticated PUT request
*
* @param {string} - url
* @param {object} - data (request body)
* @param {string} - token (for authentication)
* @param {object} - header - optionally pass in further header options
*
**/

export const putAuthReq = (url, data, token, header) => {
  return () => fetch(url, put(reqOptions(data, {...header, ...authHeader(token)})))
}

/**
* Create an authenticated GET request
*
* @param {string} - url
* @param {string} - token (for authentication)
* @param {object} - header - optionally pass in further header options
*
**/

export const getAuthReq = (url, token, header) => {
  return () => fetch(url, get(reqOptions(null, {...header, ...authHeader(token)})))
}

export const delAuthReq = (url, token, header) => {
  return () => fetch(url, del(reqOptions(null, {...header, ...authHeader(token)})))
}

/**
* Create an unauthenticated POST request
*
* @param {string} - url
* @param {object} - data (request body)
* @param {object} - header - optionally pass in further header options
*
**/

export const postReq = (url, data, header) => {
  return () => fetch(url, post(reqOptions(data, header)))
}

/**
* Create an unauthenticated PUT request
*
* @param {string} - url
* @param {object} - data (request body)
* @param {object} - header - optionally pass in further header options
*
**/

export const putReq = (url, data, header) => {
  return () => fetch(url, put(reqOptions(data, header)))
}

/**
* Create an unauthenticated GET request
*
* @param {string} - url
* @param {object} - header - optionally pass in further header options
*
**/

export const getReq = (url, header) => {
  return () => fetch(url, get(reqOptions(null, header)))
}

export const delReq = (url, header) => {
  return () => fetch(url, del(reqOptions(null, header)))
}

// Helper functions to format the request options

const reqOptions = (data=null, headers={}) => {
  const reqHeader = {
    'credentials': 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    }
  };
  return data ? { ...reqHeader, body: JSON.stringify(data) } : reqHeader
};

const post = reqOptions => ({
  ...reqOptions,
  method: 'POST'
})

const put = reqOptions => ({
  ...reqOptions,
  method: 'PUT'
})

const get = reqOptions => ({
  ...reqOptions,
  method: 'GET'
})

const del = reqOptions => ({
  ...reqOptions,
  method: 'DELETE'
})

const authHeader = token => {
  if (!token) {
    throw new Error('Token required to send an authenticated request');
  } else {
   return { 'Authorization': token }
  }
}

export const helpers = {
  reqOptions,
  post,
  put,
  get,
  del,
  authHeader,
}
