import api from './api';

export const uploadFile = ({ file, signedRequest, url }) =>
  fetch(signedRequest, { method: 'put', body: file })
    .then(() => Promise.resolve(url));

export const getSignedRequest = file =>
  api.get(`sign-s3?file-name=${file.name}&file-type=${file.type}`);