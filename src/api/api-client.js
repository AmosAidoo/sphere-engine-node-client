const request = require('request');

//Variable declarations
let baseUrl, accessToken, endpoint;

/**
*Initialize the access token and end point and create base url
@param string at, the access token
@param string ep, the endpoint
*/
function init(at, ep){
	accessToken = at;
	endpoint = ep;
	baseUrl = createBaseUrl(ep);
}

/**
*Create and return the base url with the endpoint
*@param string endpoint
*@return Promise
*/
function createBaseUrl(endpoint) {
	return 'https://' + endpoint + '/api/v4';
}

/**
*Make a call to the api
*/
function callApi(path, method, queries, formData){
	let call = makeHttpCall(path, method, queries, formData);
	return call;
}

/**
*Make an Http Call to the Sphere Engine API
*/
function makeHttpCall(path, method, queries, formData){
	if (queries == null) queries = {};
	queries.access_token = accessToken;
	
	let options = {
		url: baseUrl + path,
		method: method,
		qs: queries,
		form: formData
	};

	return new Promise(function (resolve, reject) {
		request(options, function(error, response, body) {
			if (error) {
				reject(error);
			}
			
			if (response) {
				resolve(JSON.parse(body));
			}
		});
	});
}

module.exports = {
	init: init,
	callApi: callApi
};