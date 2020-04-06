import { Navigation, TargetLocator, WebDriver } from 'selenium-webdriver';
import { instance, mock, verify, when } from 'ts-mockito';
import { BrowserActionTestResult } from '../../../model/action-test-result/browser-action-test-result';
import { Back } from '../../../model/action/browser-action/back';
import { Forward } from '../../../model/action/browser-action/forward';
import { GoTo } from '../../../model/action/browser-action/go-to';
import { Refresh } from '../../../model/action/browser-action/refresh';
import { SwitchToDefaultContext } from '../../../model/action/browser-action/switch-to-default-context';
import { Chrome } from '../../../model/browser/chrome';

describe('BrowserAction', () => {
  describe('test', () => {
    test('when successful testBrowserAction, then add replayable testResult', async () => {
      const action = new Back([], 'foo');

      const mockedNavigation: Navigation = mock(Navigation);
      const navigation = instance(mockedNavigation);

      const mockedDriver: WebDriver = mock(WebDriver);
      when(mockedDriver.navigate()).thenReturn(navigation);
      const driver = instance(mockedDriver);

      const mockedBrowser: Chrome = mock(Chrome);
      const browser = instance(mockedBrowser);

      await action.test(browser, driver);

      expect.assertions(1);
      expect((action.testResults[0] as BrowserActionTestResult).replayable).toBe(true);
    });

    test('when failed testBrowserAction, then add non-replaybale testResult', async () => {
      const action = new Forward([], 'foo');

      const mockedDriver: WebDriver = mock(WebDriver);
      when(mockedDriver.navigate()).thenThrow(new Error());
      const driver = instance(mockedDriver);

      const mockedBrowser: Chrome = mock(Chrome);
      const browser = instance(mockedBrowser);

      await action.test(browser, driver);

      console.log(action.testResults);

      expect.assertions(1);
      expect((action.testResults[0] as BrowserActionTestResult).replayable).toBe(false);
    });
  });
});

describe('Back', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Back', () => {
      const action = new Back([], 'foo');
      expect(action.toJSON()).toEqual({ id: action.id, className: 'Back', testResults: [], image: 'foo' });
    });
  });

  describe('testBrowserAction', () => {
    test('verify correct driver method call', async () => {
      const action = new Back([], 'foo');

      const mockedNavigation: Navigation = mock(Navigation);
      const navigation = instance(mockedNavigation);

      const mockedDriver: WebDriver = mock(WebDriver);
      when(mockedDriver.navigate()).thenReturn(navigation);
      const driver = instance(mockedDriver);

      const mockedBrowser: Chrome = mock(Chrome);
      const browser = instance(mockedBrowser);

      action.test(browser, driver);

      verify(mockedDriver.navigate()).called();
      verify(mockedNavigation.back()).called();
    });
  });
});

describe('Forward', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Forward', () => {
      const action = new Forward([], 'foo');
      expect(action.toJSON()).toEqual({ id: action.id, className: 'Forward', testResults: [], image: 'foo' });
    });
  });

  describe('testBrowserAction', () => {
    test('verify correct driver method call', async () => {
      const action = new Forward([], 'foo');

      const mockedNavigation: Navigation = mock(Navigation);
      const navigation = instance(mockedNavigation);

      const mockedDriver: WebDriver = mock(WebDriver);
      when(mockedDriver.navigate()).thenReturn(navigation);
      const driver = instance(mockedDriver);

      const mockedBrowser: Chrome = mock(Chrome);
      const browser = instance(mockedBrowser);

      action.test(browser, driver);

      verify(mockedDriver.navigate()).called();
      verify(mockedNavigation.forward()).called();
    });
  });
});

describe('GoTo', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: GoTo', () => {
      const action = new GoTo([], 'foo', 'bar');
      expect(action.toJSON()).toEqual({ id: action.id, className: 'GoTo', testResults: [], image: 'foo', url: 'bar' });
    });
  });

  describe('testBrowserAction', () => {
    test('verify correct driver method call', async () => {
      const action = new GoTo([], 'foo', 'url');

      const mockedNavigation: Navigation = mock(Navigation);
      const navigation = instance(mockedNavigation);

      const mockedDriver: WebDriver = mock(WebDriver);
      when(mockedDriver.navigate()).thenReturn(navigation);
      const driver = instance(mockedDriver);

      const mockedBrowser: Chrome = mock(Chrome);
      const browser = instance(mockedBrowser);

      action.test(browser, driver);

      verify(mockedDriver.navigate()).called();
      verify(mockedNavigation.to('url')).called();
    });
  });
});

describe('Refresh', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Refresh', () => {
      const action = new Refresh([], 'foo');
      expect(action.toJSON()).toEqual({ id: action.id, className: 'Refresh', testResults: [], image: 'foo' });
    });
  });

  describe('testBrowserAction', () => {
    test('verify correct driver method call', async () => {
      const action = new Refresh([], 'foo');

      const mockedNavigation: Navigation = mock(Navigation);
      const navigation = instance(mockedNavigation);

      const mockedDriver: WebDriver = mock(WebDriver);
      when(mockedDriver.navigate()).thenReturn(navigation);
      const driver = instance(mockedDriver);

      const mockedBrowser: Chrome = mock(Chrome);
      const browser = instance(mockedBrowser);

      action.test(browser, driver);

      verify(mockedDriver.navigate()).called();
      verify(mockedNavigation.refresh()).called();
    });
  });
});

describe('SwitchToDefaultContext', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: SwitchToDefaultContext', () => {
      const action = new SwitchToDefaultContext([], 'foo');
      expect(action.toJSON()).toEqual({
        id: action.id,
        className: 'SwitchToDefaultContext',
        testResults: [],
        image: 'foo',
      });
    });
  });

  describe('testBrowserAction', () => {
    test('verify correct driver method call', async () => {
      const action = new SwitchToDefaultContext([], 'foo');

      const mockedTargetLocator: TargetLocator = mock(TargetLocator);
      const targetLocator = instance(mockedTargetLocator);

      const mockedDriver: WebDriver = mock(WebDriver);
      when(mockedDriver.switchTo()).thenReturn(targetLocator);
      const driver = instance(mockedDriver);

      const mockedBrowser: Chrome = mock(Chrome);
      const browser = instance(mockedBrowser);

      action.test(browser, driver);

      verify(mockedDriver.switchTo()).called();
      verify(mockedTargetLocator.defaultContent()).called();
    });
  });
});
