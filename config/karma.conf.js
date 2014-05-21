module.exports = function (config) {
    config.set({
        basePath: "../",
        frameworks: ['mocha'],

        files: [
            'node_modules/chai/chai.js',
            'node_modules/sinon/lib/sinon.js',
            'node_modules/sinon/lib/sinon/assert.js',
            'node_modules/sinon/lib/sinon/collection.js',
            'node_modules/sinon/lib/sinon/match.js',
            'node_modules/sinon/lib/sinon/spy.js',
            'node_modules/sinon/lib/sinon/stub.js',
            'node_modules/sinon-chai/lib/sinon-chai.js',
            'public/js/lib/angular/angular.js',
            'public/js/lib/angular/angular-cookies.min.js',
            'public/js/lib/angular/angular-route.js',
            'public/js/lib/angular/angular-mocks.js',
            'public/js/lib/module.js',
            'public/js/*.js',
            'public/js/controllers/*.js',
            'public/js/services/*.js',
            'test/mocks/unit/mockApiProvider.js',
            'test/mocks/unit/mockDataService.js',
            'test/unit/client/*.js'
        ],
        autoWatch: true,
        singleRun: false,
        browsers: ['Chrome']
    });
};