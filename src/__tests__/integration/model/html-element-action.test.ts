import { WebDriver } from 'selenium-webdriver';
import { WebClick } from '../../export/alex/action';
import { Node, NodeType } from '../../export/alex/node';
import { Click } from '../../model/action/html-element-action/click';
import { Read } from '../../model/action/html-element-action/read';
import { Type } from '../../model/action/html-element-action/type';
import { BoundingBox } from '../../model/bounding-box';
import { Chrome } from '../../model/browser/chrome';
import { CssLocator } from '../../model/locator/css-locator';
import { Code } from '../../model/status';

const SELENIUM_SERVER_URL: string = process.env.SELENIUM_SERVER_URL as string;

function buildWebDriver(): WebDriver {
  const chrome = new Chrome('foo', 800, 600, 0, false);
  const driver = chrome.buildWebDriver(SELENIUM_SERVER_URL);
  driver.navigate().to('https://github.com/cyluxx/chrec-core');
  return driver;
}

test('HtmlElementAction findElement has invalid locator', async () => {
  jest.setTimeout(10000);
  const driver = buildWebDriver();

  const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
  action.recommendedLocator = new CssLocator('foo', '#not-a-valid-locator-value');

  expect.assertions(1);
  await expect(action.findElement(driver)).rejects.toThrow();

  await driver.quit();
});

test('HtmlElementAction findElement has valid locator', async () => {
  jest.setTimeout(10000);
  const driver = buildWebDriver();

  const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
  action.recommendedLocator = new CssLocator('foo', 'body');

  expect.assertions(1);
  await expect(action.findElement(driver)).resolves.toBeDefined();

  await driver.quit();
});

test('Click run returns ok status when has a valid recommended locator', async () => {
  jest.setTimeout(10000);
  const driver = buildWebDriver();

  const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
  action.recommendedLocator = new CssLocator('foo', 'body');

  const status = await action.run(driver);

  await driver.quit();

  expect.assertions(1);
  expect(status.code).toBe(Code.OK);
});

test('Click run returns error status when has not a recommended locator', async () => {
  jest.setTimeout(10000);
  const driver = buildWebDriver();

  const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));

  const status = await action.run(driver);

  await driver.quit();

  expect.assertions(1);
  expect(status.code).toBe(Code.RECOMMENDED_LOCATOR_NOT_SPECIFIED);
});

test('Click run returns error status when the recommended locator is not found', async () => {
  jest.setTimeout(10000);
  const driver = buildWebDriver();

  const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
  action.recommendedLocator = new CssLocator('foo', '#not-a-valid-locator-value');

  const status = await action.run(driver);

  await driver.quit();

  expect.assertions(1);
  expect(status.code).toBe(Code.NO_SUCH_ELEMENT);
});

test('Click toAlexActions returns valid Action array when has a recommended locator specified', () => {
  const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
  action.recommendedLocator = new CssLocator('foo', '#bar');

  expect(action.toAlexActions()).toEqual([new WebClick(new Node('#bar', NodeType.CSS))]);
});

test('Click toAlexActions throws error whenhas no recommended locator specified', () => {
  const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));

  expect(action.toAlexActions).toThrow();
});

// test('Read run returns ok status when has a valid recommended locator', async () => {
//   jest.setTimeout(10000);
//   const driver = buildWebDriver();

//   const action: Read = new Read('foo', [], new BoundingBox(42, 42, 42, 42), 'valid');
//   action.setRecommendedLocator(new CssLocator('foo', 'body'));

//   const status = await action.run(driver);

//   await driver.quit();

//   expect.assertions(1);
//   expect(status.getCode()).toBe(Code.OK);
// });

// test('Read run returns error status when has not a recommended locator', async () => {
//   jest.setTimeout(10000);
//   const driver = buildWebDriver();

//   const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));

//   const status = await action.run(driver);

//   await driver.quit();

//   expect.assertions(1);
//   expect(status.getCode()).toBe(Code.RECOMMENDED_LOCATOR_NOT_SPECIFIED);
// });

// test('Read run returns error status when the recommended locator is not found', async () => {
//   jest.setTimeout(10000);
//   const driver = buildWebDriver();

//   const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
//   action.setRecommendedLocator(new CssLocator('foo', '#not-a-valid-locator-value'));

//   const status = await action.run(driver);

//   await driver.quit();

//   expect.assertions(1);
//   expect(status.getCode()).toBe(Code.NO_SUCH_ELEMENT);
// });

// test('Read toAlexActions returns valid Action array when has a recommended locator specified', () => {
//   const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
//   action.setRecommendedLocator(new CssLocator('foo', '#bar'));

//   expect(action.toAlexActions()).toEqual([new WebClick(new Node('#bar', NodeType.CSS))]);
// });

// test('Read toAlexActions throws error whenhas no recommended locator specified', () => {
//   const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));

//   expect(action.toAlexActions).toThrow();
// });

// test('Type run returns ok status when has a valid recommended locator', async () => {
//   jest.setTimeout(10000);
//   const driver = buildWebDriver();

//   const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
//   action.setRecommendedLocator(new CssLocator('foo', 'body'));

//   const status = await action.run(driver);

//   await driver.quit();

//   expect.assertions(1);
//   expect(status.getCode()).toBe(Code.OK);
// });

// test('Type run returns error status when has not a recommended locator', async () => {
//   jest.setTimeout(10000);
//   const driver = buildWebDriver();

//   const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));

//   const status = await action.run(driver);

//   await driver.quit();

//   expect.assertions(1);
//   expect(status.getCode()).toBe(Code.RECOMMENDED_LOCATOR_NOT_SPECIFIED);
// });

// test('Type run returns error status when the recommended locator is not found', async () => {
//   jest.setTimeout(10000);
//   const driver = buildWebDriver();

//   const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
//   action.setRecommendedLocator(new CssLocator('foo', '#not-a-valid-locator-value'));

//   const status = await action.run(driver);

//   await driver.quit();

//   expect.assertions(1);
//   expect(status.getCode()).toBe(Code.NO_SUCH_ELEMENT);
// });

// test('Type toAlexActions returns valid Action array when has a recommended locator specified', () => {
//   const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
//   action.setRecommendedLocator(new CssLocator('foo', '#bar'));

//   expect(action.toAlexActions()).toEqual([new WebClick(new Node('#bar', NodeType.CSS))]);
// });

// test('Type toAlexActions throws error whenhas no recommended locator specified', () => {
//   const action: Click = new Click('foo', [], new BoundingBox(42, 42, 42, 42));

//   expect(action.toAlexActions).toThrow();
// });
