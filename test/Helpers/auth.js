var OAuth = require('../../api/models/OAuth.js');

module.exports.getTokenForUser = function(user){

	return OAuth.saveToken({
		accessToken: "testACCESSToken123ABC!",
		accessTokenExpiresOn: Date.now() + 1000,
		refreshToken: "testREFRESHToken123ABC!",
		refreshTokenExpiresOn: Date.now() + 1000
	}, {
		clientId: "testClient"
	}, user);

};
