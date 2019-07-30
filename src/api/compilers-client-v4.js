const apiClient = require('./api-client');
const fs = require('fs');
/**
*Create the api client
*/
function init(at, ep){
	accessToken = at;
	endpoint = ep;
	apiClient.init(accessToken, endpoint);
}

/**
*Test endpoint and access token
*@return Promise
*/
function test(){
	return apiClient.callApi('/test', 'GET', null, null);
}

/**
*Get details of all the compilers available
*@return Promise
*/
function getCompilers(){
	return apiClient.callApi('/compilers', 'GET', null, null);
}

/**
*Creates a submission
*
*@param string source, path to source file
*@param int compiler, compilerId
*@param string input, inputs to feed to compiler
*@return Promise
*/
function createSubmission(source, compiler, input){
	source = fs.createReadStream(source);
	var submissionData = {
		source: source,
		compilerId: compiler,
		input: input
	};
	return apiClient.callApi('/submissions', 'POST', null, submissionData);
}

/**
*Get details of a submission
*@param array(int) ids, id(s) of submission(s)
*@return Promise
*/
function getSubmission(ids) {
	let queries = {ids: ""};
	queries.ids = ids.join();
	return apiClient.callApi('/submissions', 'GET', queries, null);
}

module.exports = {
	init: init,
	test: test,
	getCompilers: getCompilers,
	createSubmission: createSubmission,
	getSubmission: getSubmission
}