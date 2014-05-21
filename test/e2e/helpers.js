module.exports = function(ptor) {
    function waitForNavigation(path) {
        ptor.wait(function() {
            return ptor.driver.getCurrentUrl().then(function(url) {
                return !!url.match(path);
            });
        });
    }
    return {
        waitForNavigation: waitForNavigation
    };
};