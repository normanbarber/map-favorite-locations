var collection = require('./dbCollection');

module.exports = function() {
	var SessionCollection = collection('sessions', null, function(record) {return record;});
  	return SessionCollection;
};