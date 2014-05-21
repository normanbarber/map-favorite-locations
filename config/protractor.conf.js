require('jasmine-reporters');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:8000',

    capabilities: {
		'browserName': 'chrome'
//    	'browserName': 'firefox'
    },
    allScriptsTimeout: 20000,
    specs: [
        '../test/e2e/mapLocationSpecE2E.js'
    ],

    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: false
    }
};