import { Navigation, TargetLocator, WebDriver } from 'selenium-webdriver';
import { instance, mock, verify, when } from 'ts-mockito';
import { Back } from '../../../model/action/back';
import { Forward } from '../../../model/action/forward';
import { GoTo } from '../../../model/action/go-to';
import { Refresh } from '../../../model/action/refresh';
import { SwitchToDefaultContext } from '../../../model/action/switch-to-default-context';

describe('Back', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Back', () => {
      const action = new Back('foo');
      expect(action.toJSON()).toEqual({ className: 'Back', image: 'foo' });
    })
  })

  describe('test', () => {
    test('verify correct driver method call', () => {
      const action = new Back('foo');

      const mockedNavigation: Navigation = mock(Navigation);
      const navigation = instance(mockedNavigation);

      const mockedDriver: WebDriver = mock(WebDriver);
      when(mockedDriver.navigate()).thenReturn(navigation);
      const driver = instance(mockedDriver);

      action.test(driver);

      verify(mockedDriver.navigate()).called();
      verify(mockedNavigation.back()).called();
    })
  })
});

describe('Forward', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Forward', () => {
      const action = new Forward('foo');
      expect(action.toJSON()).toEqual({ className: 'Forward', image: 'foo' });
    })
  })

  describe('test', () => {
    test('verify correct driver method call', () => {
      const action = new Forward('foo');

      const mockedNavigation: Navigation = mock(Navigation);
      const navigation = instance(mockedNavigation);

      const mockedDriver: WebDriver = mock(WebDriver);
      when(mockedDriver.navigate()).thenReturn(navigation);
      const driver = instance(mockedDriver);

      action.test(driver);

      verify(mockedDriver.navigate()).called();
      verify(mockedNavigation.forward()).called();
    })
  })
});

describe('GoTo', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Back', () => {
      const action = new GoTo('foo', 'bar');
      expect(action.toJSON()).toEqual({ className: 'GoTo', image: 'foo', url: 'bar' });
    })
  })

  describe('test', () => {
    test('verify correct driver method call', () => {
      const action = new GoTo('foo', 'url');

      const mockedNavigation: Navigation = mock(Navigation);
      const navigation = instance(mockedNavigation);

      const mockedDriver: WebDriver = mock(WebDriver);
      when(mockedDriver.navigate()).thenReturn(navigation);
      const driver = instance(mockedDriver);

      action.test(driver);

      verify(mockedDriver.navigate()).called();
      verify(mockedNavigation.to('url')).called();
    })
  })
});

describe('Refresh', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Back', () => {
      const action = new Refresh('foo');
      expect(action.toJSON()).toEqual({ className: 'Refresh', image: 'foo' });
    })
  })

  describe('test', () => {
    test('verify correct driver method call', () => {
      const action = new Refresh('foo');

      const mockedNavigation: Navigation = mock(Navigation);
      const navigation = instance(mockedNavigation);

      const mockedDriver: WebDriver = mock(WebDriver);
      when(mockedDriver.navigate()).thenReturn(navigation);
      const driver = instance(mockedDriver);

      action.test(driver);

      verify(mockedDriver.navigate()).called();
      verify(mockedNavigation.refresh()).called();
    })
  })
});

describe('SwitchToDefaultContext', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Back', () => {
      const action = new SwitchToDefaultContext('foo');
      expect(action.toJSON()).toEqual({ className: 'SwitchToDefaultContext', image: 'foo' });
    })
  })

  describe('test', () => {
    test('verify correct driver method call', () => {
      const action = new SwitchToDefaultContext('foo');

      const mockedTargetLocator: TargetLocator = mock(TargetLocator);
      const targetLocator = instance(mockedTargetLocator);

      const mockedDriver: WebDriver = mock(WebDriver);
      when(mockedDriver.switchTo()).thenReturn(targetLocator);
      const driver = instance(mockedDriver);

      action.test(driver);

      verify(mockedDriver.switchTo()).called();
      verify(mockedTargetLocator.defaultContent()).called();
    })
  })
});
