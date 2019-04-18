# ChRec Core
ChRec's core and replay business logic and model for testing HTML locator robustness.

[![Build Status](https://travis-ci.org/cyluxx/chrec-core.svg?branch=master)](https://travis-ci.org/cyluxx/chrec-core)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/cyluxx/chrec-core/master.svg)](https://codecov.io/gh/cyluxx/chrec-core/)

## Contributing
Clone this repository:
```
git clone https://github.com/cyluxx/chrec-core.git
```

Navigate to the installed location and install dependencies:
```
cd chrec-core
npm install
```

Run Tests with:
```
npm run test
```
Make sure that at least one proper _Selenium_ server instance is running and all corresponding webdrivers are installed and configured:
* [Chrome](http://chromedriver.chromium.org/)
* [Edge](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)
* [Firefox](https://github.com/mozilla/geckodriver)
* [Internet Explorer](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver)

You can configure your _Selenium_ Url via the SELENIUM_SERVER_URL variable in the _package.json_:
```
"scripts": {
    ...
    "test-dev": "cross-env SELENIUM_SERVER_URL=http://localhost:4444/wd/hub NODE_ENV=dev jest --config jestconfig.json",
    ...
  },
```

Format code with:
```
npm run format
```

Lint code with:
```
npm run lint
```

