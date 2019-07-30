const apiClient = require('./api-client');
const fs = require('fs');

let accessToken, endpoint;
function init(at, ep){
	accessToken = at;
	endpoint = ep;
	apiClient.init(accessToken, endpoint);
}

function test(){
	let test = apiClient.callApi('/test', 'GET', null);
	test.then(function(message) {
		console.log(message);
	});
}

function getCompilers(){
	return apiClient.callApi('/compilers', 'GET', null);
}

module.exports = {
	init: init,
	test: test,
	getCompilers, getCompilers
}