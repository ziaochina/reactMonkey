import * as requestHelpers from './src/request-creator-helpers.js';
import fetchWrapper from './src/fetch-wrapper.js';
import config from '../../../web.config.js'

// base
const postReq = requestHelpers.postReq;
const getReq = requestHelpers.getReq;
const putReq = requestHelpers.putReq;
const delReq = requestHelpers.delReq;
const postAuthReq = requestHelpers.postAuthReq;
const putAuthReq = requestHelpers.putAuthReq;
const getAuthReq = requestHelpers.getAuthReq;
const delAuthReq = requestHelpers.delAuthReq;
const sendRequest = fetchWrapper;

// utils
export const get = (url, header) => {
	return new Promise((resolve, reject) => sendRequest({
		request: getReq(url, header),
		responseType: 'json',
		onSuccess: resolve,
		onError: reject
	}));
};

export const post = (url, data, header) => {
	if(url.indexOf('/')==0)url=config.RootPath+url;
	return new Promise((resolve, reject) => sendRequest({
		request: postReq(url, data, header),
		responseType: 'json',
		onSuccess: resolve,
		onError: reject
	}));
};

export const put = (url, data, header) => {
	return new Promise((resolve, reject) => sendRequest({
		request: putReq(url, data, header),
		responseType: 'json',
		onSuccess: resolve,
		onError: reject
	}));
};

export const del = (url, header) => {
	return new Promise((resolve, reject) => sendRequest({
		request: delReq(url, header),
		responseType: 'json',
		onSuccess: resolve,
		onError: reject
	}));
};
//
// export const getAuth = (url, token, header) => {
// 	return new Promise((resolve, reject) => sendRequest({
// 		request: getAuthReq(url,token, header),
// 		responseType: 'json',
// 		onSuccess: resolve,
// 		onError: reject
// 	}));
// };
//
// export const postAuth = (url, data, token,header) => {
// 	return new Promise((resolve, reject) => sendRequest({
// 		request: postAuthReq(url, data, token,header),
// 		responseType: 'json',
// 		onSuccess: resolve,
// 		onError: reject
// 	}));
// };
//
// export const putAuth = (url, data,token, header) => {
// 	return new Promise((resolve, reject) => sendRequest({
// 		request: putAuthReq(url, data, token,header),
// 		responseType: 'json',
// 		onSuccess: resolve,
// 		onError: reject
// 	}));
// };
//
// export const delAuth = (url,token, header) => {
// 	return new Promise((resolve, reject) => sendRequest({
// 		request: delAuthReq(url, token,header),
// 		responseType: 'json',
// 		onSuccess: resolve,
// 		onError: reject
// 	}));
// };

/**
EXAMPLE USAGE

sendRequest({
  request: postReq('localhost:9009/login', {name: 'name'}), //this should be a function that returns a fetch request
  responseType: 'json'
  onSuccess: json => {},
  onError: (error) => {}
})
**/
