function updateUserData(req, res, user) {
	var encodedData = new Buffer(JSON.stringify(user)).toString('base64');
	req.cookies.userData = encodedData;
	res.cookie('userData', encodedData, { maxAge: 1000*60*60, httpOnly: false });
	var result =  new Buffer(req.cookies.userData, 'base64').toString('ascii');
}

function deleteUserData(res) {
	res.clearCookie('userData');
}

function getUserData(req) {
	if (req.cookies.userData) {
		var result =  new Buffer(req.cookies.userData, 'base64').toString('ascii');
		return JSON.parse(result);
	}
}

exports = module.exports = {
    updateUserData: updateUserData,
    deleteUserData: deleteUserData,
    getUserData: getUserData
};