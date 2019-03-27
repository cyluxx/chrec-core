import { WebDriver } from 'selenium-webdriver';
import { Click } from '../../model/action/html-element-action/click';
import { BoundingBox } from '../../model/bounding-box';
import { Chrome } from '../../model/browser/chrome';
import { CssLocator } from '../../model/locator/css-locator';

const SELENIUM_SERVER_URL: string = process.env.SELENIUM_SERVER_URL as string;
const CHROME: Chrome = new Chrome('foo', 800, 600, 0, false);

test('HtmlElementAction findElement has valid locator', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = CHROME.buildWebDriver(SELENIUM_SERVER_URL);
  driver.navigate().to('https://github.com/cyluxx/chrec-core');

  const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
  action.setRecommendedLocator(new CssLocator('foo', '#not-a-valid-locator-value'));

  expect.assertions(1);
  await expect(action.findElement(driver)).rejects.toThrow();

  await driver.quit();
});

test('HtmlElementAction findElement has invalid locator', async () => {
  jest.setTimeout(10000);
  const driver: WebDriver = CHROME.buildWebDriver(SELENIUM_SERVER_URL);
  driver.navigate().to('https://github.com/cyluxx/chrec-core');

  const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
  action.setRecommendedLocator(new CssLocator('foo', 'body'));

  expect.assertions(1);
  await expect(action.findElement(driver)).resolves.toBeDefined();

  await driver.quit();
});
