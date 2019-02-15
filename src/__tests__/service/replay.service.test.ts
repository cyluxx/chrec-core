import { WebDriver } from "selenium-webdriver";
import { Click } from "../../model/action/html-element-action/click";
import { BoundingBox } from "../../model/bounding-box";
import { Firefox } from "../../model/browser/firefox";
import { CssLocator } from "../../model/locator/css-locator";
import { Locator } from "../../model/locator/locator";
import { HtmlElementActionTestResult } from "../../model/test-result/html-element-action-test-result";
import { LocatorTestResult } from "../../model/test-result/locator-test-result";
import { ReplayService } from '../../service/replay.service';

const SELENIUM_SERVER_URL: string = process.env.SELENIUM_SERVER_URL as string;
const REPLAY_SERVICE: ReplayService = new ReplayService();
const FIREFOX = new Firefox('foo', 800, 600);
let driver: WebDriver;

beforeAll(() => {
  jest.setTimeout(10000);
  driver = FIREFOX.buildWebDriver(SELENIUM_SERVER_URL);
});

afterAll(() => {
  driver.quit();
});

test('testLocator', async () => {
  const locator: CssLocator = new CssLocator('foo', 'body');
  const locatorTestResult: LocatorTestResult = await REPLAY_SERVICE.testLocator(locator, driver);

  expect.assertions(2);
  expect(locatorTestResult.getLocator()).toEqual(locator);
  expect(locatorTestResult.isReplayable()).toBe(true);
});

test('testHtmlElementAction', async () => {
  const locators: Locator[] = [new CssLocator('foo', 'body')];
  const action: Click = new Click('foo', locators, new BoundingBox(42, 42, 42, 42));

  const htmlElementActionTestResult: HtmlElementActionTestResult = await REPLAY_SERVICE.testHtmlElementAction(action, driver);

  expect(htmlElementActionTestResult.getAction()).toEqual(action);
  expect(htmlElementActionTestResult.isReplayable()).toBe(true);
});