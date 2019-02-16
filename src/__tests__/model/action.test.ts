import { WebDriver } from 'selenium-webdriver';
import { Back } from '../../model/action/back';
import { Forward } from '../../model/action/forward';
import { GoTo } from '../../model/action/go-to';
import { Refresh } from '../../model/action/refresh';
import { Firefox } from '../../model/browser/firefox';
import { Code } from '../../model/status';

const SELENIUM_SERVER_URL: string = process.env.SELENIUM_SERVER_URL as string;
const FIREFOX: Firefox = new Firefox('foo', 800, 600);
let driver: WebDriver;

beforeEach(() => {
  jest.setTimeout(10000);
  driver = FIREFOX.buildWebDriver(SELENIUM_SERVER_URL);
});

afterEach(() => {
  driver.quit();
});

test('Back run returns OK status', async () => {
  const action: Back = new Back('foo');

  expect.assertions(1);
  expect((await action.run(driver)).getCode()).toBe(Code.OK);
});

test('Forward run returns OK status', async () => {
  const action: Forward = new Forward('foo');

  expect.assertions(1);
  expect((await action.run(driver)).getCode()).toBe(Code.OK);
});

test('GoTo run returns OK status', async () => {
  const action: GoTo = new GoTo('foo', 'https://github.com/cyluxx/chrec-core');

  expect.assertions(1);
  expect((await action.run(driver)).getCode()).toBe(Code.OK);
});

test('Refresh run returns OK status', async () => {
  const action: Refresh = new Refresh('foo');

  expect.assertions(1);
  expect((await action.run(driver)).getCode()).toBe(Code.OK);
});