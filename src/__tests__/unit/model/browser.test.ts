import { Builder, Capabilities, Capability, ISize, ThenableWebDriver, WebDriver } from 'selenium-webdriver';
import { instance, mock, spy, when } from 'ts-mockito';
import { Chrome } from '../../../model/browser/chrome';
import { Edge } from '../../../model/browser/edge';
import { Firefox } from '../../../model/browser/firefox';
import { InternetExplorer } from '../../../model/browser/internet-explorer';

describe('Chrome', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Chrome', () => {
      const browser = new Chrome('foo', 42, 42, 42);
      expect(browser.toJSON()).toEqual({
        className: 'Chrome',
        name: 'foo',
        width: 42,
        height: 42,
        sleepMsBetweenActions: 42,
      });
    });
  });

  describe('getBuilder', () => {
    test('returns correct builder', () => {
      const browser = new Chrome('foo', 42, 42, 42);

      const builder: Builder = browser.getBuilder('bar');
      expect(builder.getServerUrl()).toEqual('bar');
      expect(builder.getCapabilities().get('browserName')).toEqual('chrome');
    });
  });
});

describe('Edge', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Edge', () => {
      const browser = new Edge('foo', 42, 42, 42);
      expect(browser.toJSON()).toEqual({
        className: 'Edge',
        name: 'foo',
        width: 42,
        height: 42,
        sleepMsBetweenActions: 42,
      });
    });
  });

  describe('getBuilder', () => {
    test('returns correct builder', () => {
      const browser = new Edge('foo', 42, 42, 42);

      const builder: Builder = browser.getBuilder('bar');
      expect(builder.getServerUrl()).toEqual('bar');
      expect(builder.getCapabilities().get('browserName')).toEqual('MicrosoftEdge');
    });
  });
});

describe('Firefox', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Firefox', () => {
      const browser = new Firefox('foo', 42, 42, 42);
      expect(browser.toJSON()).toEqual({
        className: 'Firefox',
        name: 'foo',
        width: 42,
        height: 42,
        sleepMsBetweenActions: 42,
      });
    });
  });

  describe('getBuilder', () => {
    test('returns correct builder', () => {
      const browser = new Firefox('foo', 42, 42, 42);

      const builder: Builder = browser.getBuilder('bar');
      expect(builder.getServerUrl()).toEqual('bar');
      expect(builder.getCapabilities().get('browserName')).toEqual('firefox');
    });
  });
});

describe('InternetExplorer', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: InternetExplorer', () => {
      const browser = new InternetExplorer('foo', 42, 42, 42);
      expect(browser.toJSON()).toEqual({
        className: 'InternetExplorer',
        name: 'foo',
        width: 42,
        height: 42,
        sleepMsBetweenActions: 42,
      });
    });
  });

  describe('getBuilder', () => {
    test('returns correct builder', () => {
      const browser = new InternetExplorer('foo', 42, 42, 42);

      const builder: Builder = browser.getBuilder('bar');
      expect(builder.getServerUrl()).toEqual('bar');
      expect(builder.getCapabilities().get('browserName')).toEqual('internet explorer');
    });
  });
});
