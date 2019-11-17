import { By, WebDriver } from 'selenium-webdriver';
import { instance, mock, spy, when } from 'ts-mockito';
import { Method } from '../../../model/locator';
import { LocatorTestResult } from '../../../model/locator-test-result';
import { CssLocator } from '../../../model/locator/css-locator'
import { XpathLocator } from '../../../model/locator/xpath-locator'

describe('Locator', () => {
  describe('replayable', () => {
    test('when no testResults, then return false', () => {
      const locator = new XpathLocator([], Method.CSS_SELECTOR_GENERATOR, 'foo');
      expect(locator.replayable).toBe(false);
    })

    test('when first testResult not replayable, then return false', () => {
      const locator = new XpathLocator([new LocatorTestResult(false)], Method.CSS_SELECTOR_GENERATOR, 'foo');
      expect(locator.replayable).toBe(false);
    })

    test('when first testResult replayable, then return true', () => {
      const locator = new CssLocator([new LocatorTestResult(true)], Method.CSS_SELECTOR_GENERATOR, 'foo');
      expect(locator.replayable).toBe(true);
    })
  })

  describe('addTestResult', () => {
    test('when testResult, then add it to list', () => {
      const locator = new CssLocator([], Method.CSS_SELECTOR_GENERATOR, 'foo');
      locator.addTestResult(new LocatorTestResult(false));

      expect(locator.testResults).toEqual(
        [new LocatorTestResult(false)]
      );
    })
  })

  describe('replayableTestResultCount', () => {
    test('when 3 replayable testResults, then return 3', () => {
      const locator = new CssLocator(
        [
          new LocatorTestResult(true),
          new LocatorTestResult(false),
          new LocatorTestResult(true),
          new LocatorTestResult(false),
          new LocatorTestResult(true),
        ],
        Method.CSS_SELECTOR_GENERATOR,
        'foo');
      locator.addTestResult(new LocatorTestResult(false));

      expect(locator.replayableTestResultCount()).toBe(3);
    })
  })

  describe('test', () => {
    test('when driver finds element, then add replayable test result', async () => {
      const mockedDriver: WebDriver = mock(WebDriver);
      const driver = instance(mockedDriver);

      const locator = new XpathLocator([], Method.CSS_SELECTOR_GENERATOR, 'foo');
      const spiedLocator = spy(locator);
      when(spiedLocator.findElement(driver)).thenResolve();

      await locator.test(driver);

      expect.assertions(1);
      expect(locator.testResults).toEqual([new LocatorTestResult(true)]);
    })

    test('when driver does not find element, then add replayable test result', async () => {
      const mockedDriver: WebDriver = mock(WebDriver);
      const driver = instance(mockedDriver);

      const locator = new XpathLocator([], Method.CSS_SELECTOR_GENERATOR, 'foo');
      const spiedLocator = spy(locator);
      when(spiedLocator.findElement(driver)).thenReject();

      await locator.test(driver);

      expect.assertions(1);
      expect(locator.testResults).toEqual([new LocatorTestResult(false)]);
    })
  })
})

describe('CssLocator', () => {
  describe('toJSON', () => {
    test('the JSON should contain the ClassName: CssLocator', () => {
      const locator = new CssLocator([], Method.FINDER, 'foo');
      expect(locator.toJSON()).toEqual({ className: 'CssLocator', testResults: [], method: Method.FINDER, value: 'foo' });
    })
  })

  describe('toSeleniumLocator', () => {
    const locator = new CssLocator([], Method.FINDER, 'foo');
    expect(locator.toSeleniumLocator()).toEqual(By.css('foo'));
  })
});

describe('XpathLocator', () => {
  describe('toJSON', () => {
    test('the JSON should contain the ClassName: XpathLocator', () => {
      const locator = new XpathLocator([], Method.ROBULA_PLUS, 'foo');
      expect(locator.toJSON()).toEqual({ className: 'XpathLocator', testResults: [], method: Method.ROBULA_PLUS, value: 'foo' });
    })
  })

  describe('toSeleniumLocator', () => {
    const locator = new XpathLocator([], Method.ROBULA_PLUS, 'foo');
    expect(locator.toSeleniumLocator()).toEqual(By.xpath('foo'));
  })
});
