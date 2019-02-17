import { WebDriver } from 'selenium-webdriver';
import { Back } from '../../model/action/back';
import { Forward } from '../../model/action/forward';
import { GoTo } from '../../model/action/go-to';
import { Refresh } from '../../model/action/refresh';
import { Firefox } from '../../model/browser/firefox';
import { Code } from '../../model/status';

const SELENIUM_SERVER_URL: string = process.env.SELENIUM_SERVER_URL as string;
const FIREFOX: Firefox = new Firefox('foo', 800, 600);

test('Back run returns OK status', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = FIREFOX.buildWebDriver(SELENIUM_SERVER_URL);

  const action: Back = new Back('foo');

  expect.assertions(1);
  expect((await action.run(driver)).getCode()).toBe(Code.OK);

  await driver.quit();
});

test('Forward run returns OK status', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = FIREFOX.buildWebDriver(SELENIUM_SERVER_URL);

  const action: Forward = new Forward('foo');

  expect.assertions(1);
  expect((await action.run(driver)).getCode()).toBe(Code.OK);

  await driver.quit();
});

test('GoTo run returns OK status', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = FIREFOX.buildWebDriver(SELENIUM_SERVER_URL);

  const action: GoTo = new GoTo('foo', 'https://github.com/cyluxx/chrec-core');

  expect.assertions(1);
  expect((await action.run(driver)).getCode()).toBe(Code.OK);

  await driver.quit();
});

test('Refresh run returns OK status', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = FIREFOX.buildWebDriver(SELENIUM_SERVER_URL);

  const action: Refresh = new Refresh('foo');

  expect.assertions(1);
  expect((await action.run(driver)).getCode()).toBe(Code.OK);

  await driver.quit();
});
