import axios from 'axios';
import ms from 'ms';

const DEFAULT_REQ_TIMEOUT = '10s';

const getError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return error.response;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return error.request;
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message;
  }
};

const addAuthenticationHeader = (
  headers,
  req
) => {
  if (!req) return;
  if (req.headers.tabcorpauth) {
    headers.tabcorpauth = req.headers.tabcorpauth;
  } else if (req.headers.authorization) {
    headers.authorization = req.headers.authorization;
  }
};

async function get(
  url,
  timeout,
  req = null
) {
  try {
    const headers = { Accept: '*/*' };
    addAuthenticationHeader(headers, req);
    const requestTimeout = timeout || DEFAULT_REQ_TIMEOUT;
    const client = axios.create({ headers, timeout: ms(requestTimeout) });
    const endpointResponse = await client.get(url);
    const result = endpointResponse.data
      ? endpointResponse.data
      : endpointResponse;
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(getError(error));
  }
}

async function post(
  url,
  payload,
  timeout,
  req = null
) {
  try {
    const headers = {
      Accept: '*/*'
    };
    addAuthenticationHeader(headers, req);
    const requestTimeout = timeout || DEFAULT_REQ_TIMEOUT;
    const client = axios.create({ headers, timeout: ms(requestTimeout) });
    const endpointResponse = await client.post(url, payload);
    const result = endpointResponse.data
      ? endpointResponse.data
      : endpointResponse;
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(getError(error));
  }
}

export default { get, post };
