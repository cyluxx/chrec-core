import { WebDriver } from 'selenium-webdriver';
import { Back } from '../../model/action/back';
import { Forward } from '../../model/action/forward';
import { GoTo } from '../../model/action/go-to';
import { Refresh } from '../../model/action/refresh';
import { Chrome } from '../../model/browser/chrome';
import { Code, Status } from '../../model/status';

const SELENIUM_SERVER_URL: string = process.env.SELENIUM_SERVER_URL as string;
const CHROME: Chrome = new Chrome('foo', 800, 600, 0, false);

test('Back run returns OK status', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = CHROME.buildWebDriver(SELENIUM_SERVER_URL);

  const action: Back = new Back('foo');
  const status: Status = await action.run(driver);

  await driver.quit();

  expect.assertions(1);
  expect(status.code).toBe(Code.OK);
});

test('Forward run returns OK status', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = CHROME.buildWebDriver(SELENIUM_SERVER_URL);

  const action: Forward = new Forward('foo');
  const status: Status = await action.run(driver);

  await driver.quit();

  expect.assertions(1);
  expect(status.code).toBe(Code.OK);
});

test('GoTo run returns OK status', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = CHROME.buildWebDriver(SELENIUM_SERVER_URL);

  const action: GoTo = new GoTo('foo', 'https://github.com/cyluxx/chrec-core');
  const status: Status = await action.run(driver);

  await driver.quit();

  expect.assertions(1);
  expect(status.code).toBe(Code.OK);
});

test('Refresh run returns OK status', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = CHROME.buildWebDriver(SELENIUM_SERVER_URL);

  const action: Refresh = new Refresh('foo');
  const status: Status = await action.run(driver);

  await driver.quit();

  expect.assertions(1);
  expect(status.code).toBe(Code.OK);
});
