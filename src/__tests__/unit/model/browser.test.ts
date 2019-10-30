import { Chrome } from '../../../model/browser/chrome';
import { Edge } from '../../../model/browser/edge';
import { Firefox } from '../../../model/browser/firefox';
import { InternetExplorer } from '../../../model/browser/internet-explorer';

describe('Chrome', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Chrome', () => {
      const action = new Chrome('foo', 42, 42, 42);
      expect(action.toJSON()).toEqual({ className: 'Chrome', name: 'foo', width: 42, height: 42, sleepMsBetweenActions: 42, headless: false });
    })
  })
});

describe('Edge', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Edge', () => {
      const action = new Edge('foo', 42, 42, 42);
      expect(action.toJSON()).toEqual({ className: 'Edge', name: 'foo', width: 42, height: 42, sleepMsBetweenActions: 42 });
    })
  })
});

describe('Firefox', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Firefox', () => {
      const action = new Firefox('foo', 42, 42, 42);
      expect(action.toJSON()).toEqual({ className: 'Firefox', name: 'foo', width: 42, height: 42, sleepMsBetweenActions: 42 });
    })
  })
});

describe('InternetExplorer', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: InternetExplorer', () => {
      const action = new InternetExplorer('foo', 42, 42, 42);
      expect(action.toJSON()).toEqual({ className: 'InternetExplorer', name: 'foo', width: 42, height: 42, sleepMsBetweenActions: 42 });
    })
  })
});
