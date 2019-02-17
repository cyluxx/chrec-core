import { WebDriver } from 'selenium-webdriver';
import { Action } from '../../model/action/action';
import { Click } from '../../model/action/html-element-action/click';
import { Refresh } from '../../model/action/refresh';
import { BoundingBox } from '../../model/bounding-box';
import { Firefox } from '../../model/browser/firefox';
import { CssLocator } from '../../model/locator/css-locator';
import { Locator } from '../../model/locator/locator';
import { Project } from '../../model/project';
import { Sequence } from '../../model/sequence';
import { Settings } from '../../model/settings';
import { ActionTestResult } from '../../model/test-result/action-test-result';
import { BrowserTestResult } from '../../model/test-result/browser-test-result';
import { HtmlElementActionTestResult } from '../../model/test-result/html-element-action-test-result';
import { LocatorTestResult } from '../../model/test-result/locator-test-result';
import { ProjectTestResult } from '../../model/test-result/project-test-result';
import { SequenceTestResult } from '../../model/test-result/sequence-test-result';
import { ReplayService } from '../../service/replay.service';

const SELENIUM_SERVER_URL: string = process.env.SELENIUM_SERVER_URL as string;
const REPLAY_SERVICE: ReplayService = new ReplayService();
const FIREFOX = new Firefox('foo', 800, 600);

test('testLocator', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = FIREFOX.buildWebDriver(SELENIUM_SERVER_URL);

  const locator: CssLocator = new CssLocator('foo', 'body');
  const testResult: LocatorTestResult = await REPLAY_SERVICE.testLocator(locator, driver);

  expect.assertions(2);
  expect(testResult.getLocator()).toEqual(locator);
  expect(testResult.isReplayable()).toBe(true);

  await driver.quit();
});

test('testHtmlElementAction', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = FIREFOX.buildWebDriver(SELENIUM_SERVER_URL);
  driver.navigate().to('https://github.com/cyluxx/chrec-core');

  const locators: Locator[] = [new CssLocator('foo', 'body')];
  const action: Click = new Click('foo', locators, new BoundingBox(42, 42, 42, 42));
  const testResult: HtmlElementActionTestResult = await REPLAY_SERVICE.testHtmlElementAction(action, driver);

  expect.assertions(2);
  expect(testResult.getAction()).toEqual(action);
  expect(testResult.isReplayable()).toBe(true);

  await driver.quit();
});

test('testAction', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = FIREFOX.buildWebDriver(SELENIUM_SERVER_URL);

  const action: Refresh = new Refresh('foo');
  const testResult: ActionTestResult = await REPLAY_SERVICE.testAction(action, driver);

  expect.assertions(2);
  expect(testResult.getAction()).toEqual(action);
  expect(testResult.isReplayable()).toBe(true);

  await driver.quit();
});

test('testAction with HtmlElementAction', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = FIREFOX.buildWebDriver(SELENIUM_SERVER_URL);
  driver.navigate().to('https://github.com/cyluxx/chrec-core');

  const locators: Locator[] = [new CssLocator('foo', 'body')];
  const action: Click = new Click('foo', locators, new BoundingBox(42, 42, 42, 42));
  const testResult: ActionTestResult = await REPLAY_SERVICE.testAction(action, driver);

  expect.assertions(2);
  expect(testResult.getAction()).toEqual(action);
  expect(testResult.isReplayable()).toBe(true);

  await driver.quit();
});

test('testBrowser', async () => {
  const browser: Firefox = new Firefox('foo', 800, 600);
  const actions: Action[] = [new Refresh('foo')];
  const settings: Settings = new Settings(SELENIUM_SERVER_URL, []);
  const testResult: BrowserTestResult = await REPLAY_SERVICE.testBrowser(browser, actions, settings);

  expect.assertions(2);
  expect(testResult.getBrowser()).toEqual(browser);
  expect(testResult.isReplayable()).toBe(true);
});

test('testSequence', async () => {
  const sequence: Sequence = new Sequence('foo', [new Refresh('foo')], []);
  const settings: Settings = new Settings(SELENIUM_SERVER_URL, [new Firefox('foo', 800, 600)]);
  const testResult: SequenceTestResult = await REPLAY_SERVICE.testSequence(sequence, settings);

  expect.assertions(1);
  expect(testResult.isReplayable()).toBe(true);
});

test('testProject', async () => {
  const project: Project = new Project('foo', [new Sequence('foo', [new Refresh('foo')], [])], []);
  const settings: Settings = new Settings(SELENIUM_SERVER_URL, [new Firefox('foo', 800, 600)]);
  const testResult: ProjectTestResult = await REPLAY_SERVICE.testProject(project, settings);

  expect.assertions(1);
  expect(testResult.isReplayable()).toBe(true);
});
