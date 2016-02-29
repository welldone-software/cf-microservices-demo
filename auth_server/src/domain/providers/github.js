const querystring = require('querystring');
const request = require('koa-request');
const githubLoginUrl = 'https://github.com/login/oauth/authorize';
const baseCallbackurl = 'https://cf-demo.auth.welldone-software.com/c022e69daba448b9a84c8b83e1848184/callback/github'
const db = require('../database');
const koa = require('koa');

exports.getLoginUrl = function*(appClientId, callbackUrl){
	const config = yield db.apps.findOne({clientId : appClientId}).providers.github;
	const args = querystring.stringify({
		client_id: config.clientId,
		redirect_uri: callbackUrl,
		scope: 'user:email'
	});
	return `${githubLoginUrl}?${args}`;
}

exports.handleCallback = function*(appClientId, query){
	const reply = querystring.parse(query);
	const config = yield db.apps.findOne({clientId: appClientId});

	const accessTokenResponse = yield  request({
			url: 'https://github.com/login/oauth/access_token',
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({client_id: config.providers.github.clientId, client_secret: config.providers.github.clientSecret, code : reply.code})
	});

		const accessToken = querystring.parse(accessTokenResponse.body).access_token;
    if(!accessToken){
        throw 'no access token';
    }

    const userResponse = yield request({
        url: 'https://api.github.com/user',
        headers: {
            'Authorization': `token ${accessToken}`,
            'User-Agent': 'request'
        }
    });
    const userInfo = JSON.parse(userResponse.body);
	return { email: userInfo.email, iss: `github:${accessToken}`, };
}

