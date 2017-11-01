import fetch from 'isomorphic-fetch';

const apiBase = '/api/';

const api = (method, endPoint, options) => {
  const defaultOptions = {
    method,
    mode: 'cors',
    redirect: 'follow',
    cache: 'default',
    credentials: 'same-origin',
    processData: false,
  };
  if (method === 'POST' || method === 'PUT') {
    defaultOptions.body = JSON.stringify(options.body || {});
    defaultOptions.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }
  return fetch(`${apiBase}${endPoint}`, defaultOptions)
    .catch(() => Promise.reject({ code: 'FETCH_NETWORK_ERROR' }))
    .then((res) => {
      const { ok, status, statusMessage } = res;
      if (!ok) {
        throw new Error(`API Failure - ${method} ${endPoint}: ${status} ${statusMessage}`);
      }

      return res.text().then(text => (text ? JSON.parse(text) : {}));
    });
};

['GET', 'POST', 'PUT', 'DELETE'].forEach((method) => {
  api[method.toLowerCase()] = (endPoint, options) => api(method, endPoint, options);
});

export { api };
export default api;