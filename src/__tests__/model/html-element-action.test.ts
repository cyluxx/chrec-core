import { WebDriver, WebElement } from 'selenium-webdriver';
import { Click } from '../../model/action/html-element-action/click';
import { BoundingBox } from '../../model/bounding-box';
import { Chrome } from '../../model/browser/chrome';
import { CssLocator } from '../../model/locator/css-locator';

const SELENIUM_SERVER_URL: string = process.env.SELENIUM_SERVER_URL as string;
const CHROME: Chrome = new Chrome('foo', 800, 600, false);

test('HtmlElementAction findElement has valid locator', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = CHROME.buildWebDriver(SELENIUM_SERVER_URL);
  driver.navigate().to('https://github.com/cyluxx/chrec-core');

  const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
  action.setValidLocator(new CssLocator('foo', '#not-a-valid-locator-value'));
  const element: WebElement = await action.findElement(driver);

  await driver.quit();

  expect.assertions(1);
  expect(element).toThrow();
});

test('HtmlElementAction findElement has invalid locator', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = CHROME.buildWebDriver(SELENIUM_SERVER_URL);
  driver.navigate().to('https://github.com/cyluxx/chrec-core');

  const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
  action.setValidLocator(new CssLocator('foo', 'body'));
  const element: WebElement = await action.findElement(driver);

  await driver.quit();

  expect.assertions(1);
  expect(element).toBeDefined();
});
