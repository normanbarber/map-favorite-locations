# Map Favorite Locations

### Heroku Demo
[Map Demo on heroku](http://blooming-brushlands-5681.herokuapp.com/)
Create a new user or login with admin / admin

### Running the app

Can be run in the browser. Features login page and signup page, and lets user search for a location within the Google maps api. After user finds a location, then they have the option to save the locations to their list. Programmed with mongodb, express and jade. e2e tests using Protractor, unit tests(client) with karma-mocha and unit tests(server) using mocha.  Running demo from Heroku and Mongolab.

### Running in the browser

    node server

### Running Test

To run e2e tests you must download [chromedriver.exe](http://chromedriver.storage.googleapis.com/index.html) and [latest selenium-server-standalone jar](http://docs.seleniumhq.org/download/)

I didn't include these in the repo because of the size. 

unit(server-side) tests use mocha, sinon and chai
unit(client-side) tests use karma-mocha
e2e tests use protractorjs

#### Running e2e test

Open 2 command prompts

##### In window 1:

    scripts\start-selenium.bat


##### In window 2:

    scripts\e2e-test.bat


#### Running unit test(server)

Using mocha for unit testing server

Open a command prompt

##### In window 1:

    mocha test\unit\server\mapLocationSpec --reporter spec


#### Running unit test(client)

Using karma-mocha for unit testing client

Open a command prompt

##### In window 1:

    scripts\test.bat
