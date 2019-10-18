import { Back } from '../../../../model/action/back';
import { Forward } from '../../../../model/action/forward';
import { GoTo } from '../../../../model/action/go-to';
import { Refresh } from '../../../../model/action/refresh';
import { SwitchToDefaultContext } from '../../../../model/action/switch-to-default-context';

describe('Back', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Back', () => {
      const action = new Back('foo');
      expect(action.toJSON()).toEqual({ className: 'Back', image: 'foo' });
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
});

describe('GoTo', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Back', () => {
      const action = new GoTo('foo', 'bar');
      expect(action.toJSON()).toEqual({ className: 'GoTo', image: 'foo', url: 'bar' });
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
});

describe('SwitchToDefaultContext', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Back', () => {
      const action = new SwitchToDefaultContext('foo');
      expect(action.toJSON()).toEqual({ className: 'SwitchToDefaultContext', image: 'foo' });
    })
  })
});