import { WebDriver } from 'selenium-webdriver';
import { Click } from '../../model/action/html-element-action/click';
import { BoundingBox } from '../../model/bounding-box';
import { Chrome } from '../../model/browser/chrome';
import { CssLocator } from '../../model/locator/css-locator';

const SELENIUM_SERVER_URL: string = process.env.SELENIUM_SERVER_URL as string;
const CHROME: Chrome = new Chrome('foo', 800, 600, false);
let driver: WebDriver;

beforeEach(() => {
  jest.setTimeout(10000);
  driver = CHROME.buildWebDriver(SELENIUM_SERVER_URL);
});

afterEach(() => {
  driver.quit();
});

test('HtmlElementAction findElement has valid locator', async () => {
  const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
  action.setValidLocator(new CssLocator('foo', '#not-a-valid-locator-value'));

  expect.assertions(1);
  await expect(action.findElement(driver)).rejects.toThrow();
});

test('HtmlElementAction findElement has invalid locator', async () => {
  const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
  action.setValidLocator(new CssLocator('foo', 'body'));

  expect.assertions(1);
  await expect(action.findElement(driver)).resolves.toBeDefined();
});
