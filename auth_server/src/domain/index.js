const fs = require('fs');
const path = require('path');
const jwt = require('koa-jwt');
const db = require('./database');

const provdiersPath = path.join.bind(path, __dirname, './providers');

const providers = fs.readdirSync(provdiersPath())
	.map(f => path.basename(f, '.js'))
	.reduce((map, name) => {map[name] = require(provdiersPath(name)); return map;}, {});

exports.getProviders = function(){
	return Object.keys(providers).sort();
}

//this is the login on our auth server
exports.getLocalLoginUrl = function(baseUrl, appClientId){
	return `${baseUrl}/${appClientId}/login`;
}

//this is the callback url for the client app
exports.getProviderLocalCallbackUrl = function(baseUrl, appClientId, provider){
	return `${baseUrl}/${appClientId}/callback/${provider}`;
}

//this builds the github url and we do redirct from the server
exports.getProviderRemoteLoginUrl = function(baseUrl, appClientId, provider){
	const providerImpl = providers[provider];
	const callbackUrl = exports.getProviderLocalCallbackUrl(baseUrl, appClientId, provider)
	return providerImpl.getLoginUrl(appClientId, callbackUrl);
}

exports.handleProviderCallback = function *(appClientId, provider, query){
	const providerImpl = providers[provider];
	const privateKey = (yield db.apps.findOne({clientId: appClientId})).privateKey;

	const userInfo = yield providerImpl.handleCallback(appClientId, query);
	return jwt.sign({  provider: provider, email: userInfo.email }, privateKey, {
        iss: userInfo.iss,
        expiresIn: '2 days'
    });

}


console.log(exports.getProviders());
console.log(exports.getLocalLoginUrl('', 'theAppId'));
console.log(exports.getProviderLocalCallbackUrl('', 'theAppId', 'github'));

// const fs = require('fs');
// const path = require('path');
// const join = path.join(path, __dirname);

// const provdiers = 
// 	fs.readdirSync('./providers')
// 	.reduce(
// 		(all, p) => {
// 			all[p] = require(p); 
// 			return all;
// 		}, 
// 		{}
// 	);

const Apps = [{
	clientId: '',
	clientSecret: '',
	privateKey: '',
	friendlyName: ''
}];

// const AppAuthenticationProviders =[{
// 	appClientId: '',
// 	provider: '',
// 	clientId: '',
// 	clientSecret: '',
// }];

// const AppUsers = [{
// 	appClientId: '',
// 	email: '',
// 	provider: '',
// 	providerContext: ''
// }];



// exports.getLocalLoginUrl = function(baseUrl, appClientId){
// 	return `${baseUrl}/${appClientId}/login`;
// }

// exports.getProviderLocalCallbackUrl = function(baseUrl, appClientId, provider){
// 	return `${baseUrl}/${appClientId}/callback/${provider}`;
// }

// exports.getProviderRemoteLoginUrl = function(appClientId, provider){
// 	const p = provdiers.find()
// }

// /*
// We start with our own app

// */



// // generate new app


// // admin adds app

// // admin get list of providers

// // admin get list of users 

// // admin adds provider for app