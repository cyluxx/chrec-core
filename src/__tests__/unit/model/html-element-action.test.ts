import { WebDriver, WebElement } from 'selenium-webdriver';
import { instance, mock, spy, verify, when } from 'ts-mockito';
import { HtmlElementActionTestResult } from '../../../model/action-test-result/html-element-action-test-result';
import { Clear } from '../../../model/action/html-element-action/clear';
import { Click } from '../../../model/action/html-element-action/click';
import { Read } from '../../../model/action/html-element-action/read';
import { Select } from '../../../model/action/html-element-action/select';
import { Submit } from '../../../model/action/html-element-action/submit';
import { SwitchToContext } from '../../../model/action/html-element-action/switch-to-context';
import { Type } from '../../../model/action/html-element-action/type';
import { WaitForAddedHtmlElement } from '../../../model/action/html-element-action/wait-for-added-html-element';
import { WaitForRemovedHtmlElement } from '../../../model/action/html-element-action/wait-for-removed-html-element';
import { BoundingBox } from '../../../model/bounding-box';
import { Edge } from '../../../model/browser/edge';
import { Firefox } from '../../../model/browser/firefox';
import { Method } from '../../../model/locator';
import { CssLocator } from '../../../model/locator/css-locator';
import { XpathLocator } from '../../../model/locator/xpath-locator';

describe('HtmlElementAction', () => {
  describe('addTestResult', () => {
    test('when HtmlElementActionTestResult, then add it to list', () => {
      const mockedBrowser: Firefox = mock(Firefox);
      const browser = instance(mockedBrowser);

      const htmlElementAction = new Clear([], 'bar', [], new BoundingBox(42, 42, 42, 42));
      htmlElementAction.addTestResult(new HtmlElementActionTestResult(browser));

      expect(htmlElementAction.testResults).toEqual([new HtmlElementActionTestResult(browser)]);
    });
  });

  describe('addLocator', () => {
    test('when Locator, then add it to list', () => {
      const htmlElementAction = new Clear([], 'bar', [], new BoundingBox(42, 42, 42, 42));
      htmlElementAction.addLocator(new CssLocator([], Method.CSS_SELECTOR_GENERATOR, 'foo'));

      expect(htmlElementAction.locators).toEqual([new CssLocator([], Method.CSS_SELECTOR_GENERATOR, 'foo')]);
    });
  });

  describe('recommendedLocator', () => {
    test('when all Locators replayable, then return Locator with highest count', () => {
      const mockedLocatorLow: CssLocator = mock(CssLocator);
      when(mockedLocatorLow.replayableTestResultCount()).thenReturn(1);
      when(mockedLocatorLow.replayable).thenReturn(true);
      const locatorLow = instance(mockedLocatorLow);

      const mockedLocatorHigh: XpathLocator = mock(XpathLocator);
      when(mockedLocatorHigh.replayableTestResultCount()).thenReturn(2);
      when(mockedLocatorHigh.replayable).thenReturn(true);
      const locatorHigh = instance(mockedLocatorHigh);

      const htmlElementAction = new Submit([], 'foo', [locatorLow, locatorHigh], new BoundingBox(42, 42, 42, 42));

      expect(htmlElementAction.recommendedLocator()).toEqual(locatorHigh);
    });

    test('when highest Locator not replayable, then return replayable Locator with highest count', () => {
      const mockedLocatorLow: CssLocator = mock(CssLocator);
      when(mockedLocatorLow.replayableTestResultCount()).thenReturn(1);
      when(mockedLocatorLow.replayable).thenReturn(true);
      const locatorLow = instance(mockedLocatorLow);

      const mockedLocatorHigh: XpathLocator = mock(XpathLocator);
      when(mockedLocatorHigh.replayableTestResultCount()).thenReturn(2);
      when(mockedLocatorHigh.replayable).thenReturn(false);
      const locatorHigh = instance(mockedLocatorHigh);

      const htmlElementAction = new Submit([], 'foo', [locatorLow, locatorHigh], new BoundingBox(42, 42, 42, 42));

      expect(htmlElementAction.recommendedLocator()).toEqual(locatorLow);
    });

    test('when no Locator replayable, then return null', () => {
      const mockedLocatorLow: CssLocator = mock(CssLocator);
      when(mockedLocatorLow.replayableTestResultCount()).thenReturn(1);
      when(mockedLocatorLow.replayable).thenReturn(false);
      const locatorLow = instance(mockedLocatorLow);

      const mockedLocatorHigh: XpathLocator = mock(XpathLocator);
      when(mockedLocatorHigh.replayableTestResultCount()).thenReturn(2);
      when(mockedLocatorHigh.replayable).thenReturn(false);
      const locatorHigh = instance(mockedLocatorHigh);

      const htmlElementAction = new Submit([], 'foo', [locatorLow, locatorHigh], new BoundingBox(42, 42, 42, 42));

      expect(htmlElementAction.recommendedLocator()).toBeNull();
    });

    test('when no Locator replayable, then return null', () => {
      const htmlElementAction = new Submit([], 'foo', [], new BoundingBox(42, 42, 42, 42));
      expect(htmlElementAction.recommendedLocator()).toBeNull();
    });
  });

  describe('test', () => {
    test('when no recommended Locator, then throw Error', async () => {
      const mockedBrowser: Edge = mock(Edge);
      const browser = instance(mockedBrowser);

      const mockedDriver: WebDriver = mock(WebDriver);
      const driver = instance(mockedDriver);

      const mockedLocator: CssLocator = mock(CssLocator);
      when(mockedLocator.test(driver)).thenResolve();
      const locator = instance(mockedLocator);

      const htmlElementAction = new WaitForRemovedHtmlElement([], 'foo', [locator], new BoundingBox(42, 42, 42, 42));

      const spiedHtmlElementAction = spy(htmlElementAction);
      when(spiedHtmlElementAction.recommendedLocator()).thenReturn(null);

      expect.assertions(1);
      await expect(htmlElementAction.test(browser, driver)).rejects.toThrow();

      verify(mockedLocator.test(driver)).called();
    });
  });
});

describe('Clear', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Clear', () => {
      const action = new Clear([], 'foo', [], new BoundingBox(42, 42, 42, 42));
      expect(action.toJSON()).toEqual({
        className: 'Clear',
        testResults: [],
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42),
      });
    });
  });

  describe('testElement', () => {
    test('verify correct driver method call', async () => {
      const action = new Clear([], 'foo', [], new BoundingBox(42, 42, 42, 42));

      const mockedDriver: WebDriver = mock(WebDriver);
      const driver = instance(mockedDriver);

      const mockedWebElement: WebElement = mock(WebElement);
      const webElement = instance(mockedWebElement);

      action.testElement(driver, webElement);

      verify(mockedWebElement.clear()).called();
    });
  });
});

describe('Click', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Click', () => {
      const action = new Click([], 'foo', [], new BoundingBox(42, 42, 42, 42));
      expect(action.toJSON()).toEqual({
        className: 'Click',
        testResults: [],
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42),
      });
    });
  });

  describe('testElement', () => {
    test('verify correct driver method call', async () => {
      const action = new Click([], 'foo', [], new BoundingBox(42, 42, 42, 42));

      const mockedDriver: WebDriver = mock(WebDriver);
      const driver = instance(mockedDriver);

      const mockedWebElement: WebElement = mock(WebElement);
      const webElement = instance(mockedWebElement);

      action.testElement(driver, webElement);

      verify(mockedWebElement.click()).called();
    });
  });
});

describe('Read', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Read', () => {
      const action = new Read([], 'foo', [], new BoundingBox(42, 42, 42, 42), 'bar');
      expect(action.toJSON()).toEqual({
        className: 'Read',
        testResults: [],
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42),
        text: 'bar',
      });
    });
  });
});

describe('Select', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Select', () => {
      const action = new Select([], 'foo', [], new BoundingBox(42, 42, 42, 42), 'bar');
      expect(action.toJSON()).toEqual({
        className: 'Select',
        testResults: [],
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42),
        value: 'bar',
      });
    });
  });
});

describe('Submit', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Submit', () => {
      const action = new Submit([], 'foo', [], new BoundingBox(42, 42, 42, 42));
      expect(action.toJSON()).toEqual({
        className: 'Submit',
        testResults: [],
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42),
      });
    });
  });

  describe('testElement', () => {
    test('verify correct driver method call', async () => {
      const action = new Submit([], 'foo', [], new BoundingBox(42, 42, 42, 42));

      const mockedDriver: WebDriver = mock(WebDriver);
      const driver = instance(mockedDriver);

      const mockedWebElement: WebElement = mock(WebElement);
      const webElement = instance(mockedWebElement);

      action.testElement(driver, webElement);

      verify(mockedWebElement.submit()).called();
    });
  });
});

describe('SwitchToContext', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: SwitchToContext', () => {
      const action = new SwitchToContext([], 'foo', [], new BoundingBox(42, 42, 42, 42));
      expect(action.toJSON()).toEqual({
        className: 'SwitchToContext',
        testResults: [],
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42),
      });
    });
  });
});

describe('Type', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Type', () => {
      const action = new Type([], 'foo', [], new BoundingBox(42, 42, 42, 42), 'bar');
      expect(action.toJSON()).toEqual({
        className: 'Type',
        testResults: [],
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42),
        value: 'bar',
      });
    });
  });
});

describe('WaitForAddedHtmlElement', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: WaitForAddedHtmlElement', () => {
      const action = new WaitForAddedHtmlElement([], 'foo', [], new BoundingBox(42, 42, 42, 42));
      expect(action.toJSON()).toEqual({
        className: 'WaitForAddedHtmlElement',
        testResults: [],
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42),
      });
    });
  });
});

describe('WaitForRemovedHtmlElement', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: WaitForRemovedHtmlElement', () => {
      const action = new WaitForRemovedHtmlElement([], 'foo', [], new BoundingBox(42, 42, 42, 42));
      expect(action.toJSON()).toEqual({
        className: 'WaitForRemovedHtmlElement',
        testResults: [],
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42),
      });
    });
  });
});
