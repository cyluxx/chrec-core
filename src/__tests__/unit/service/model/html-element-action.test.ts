import { Clear } from '../../../../model/action/html-element-action/clear';
import { Click } from '../../../../model/action/html-element-action/click';
import { Read } from '../../../../model/action/html-element-action/read';
import { Select } from '../../../../model/action/html-element-action/select';
import { Submit } from '../../../../model/action/html-element-action/submit';
import { SwitchToContext } from '../../../../model/action/html-element-action/switch-to-context';
import { Type } from '../../../../model/action/html-element-action/type';
import { WaitForAddedHtmlElement } from '../../../../model/action/html-element-action/wait-for-added-html-element';
import { WaitForRemovedHtmlElement } from '../../../../model/action/html-element-action/wait-for-removed-html-element';
import { BoundingBox } from '../../../../model/bounding-box';

describe('Clear', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Clear', () => {
      const action = new Clear('foo', [], new BoundingBox(42, 42, 42, 42));
      expect(action.toJSON()).toEqual({
        className: 'Clear',
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42)
      });
    })
  })
});

describe('Click', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Click', () => {
      const action = new Click('foo', [], new BoundingBox(42, 42, 42, 42));
      expect(action.toJSON()).toEqual({
        className: 'Click',
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42)
      });
    })
  })
});

describe('Read', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Read', () => {
      const action = new Read('foo', [], new BoundingBox(42, 42, 42, 42), 'bar');
      expect(action.toJSON()).toEqual({
        className: 'Read',
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42),
        text: 'bar'
      });
    })
  })
});

describe('Select', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Select', () => {
      const action = new Select('foo', [], new BoundingBox(42, 42, 42, 42), 'bar');
      expect(action.toJSON()).toEqual({
        className: 'Select',
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42),
        value: 'bar'
      });
    })
  })
});

describe('Submit', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Submit', () => {
      const action = new Submit('foo', [], new BoundingBox(42, 42, 42, 42));
      expect(action.toJSON()).toEqual({
        className: 'Submit',
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42)
      });
    })
  })
});

describe('SwitchToContext', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: SwitchToContext', () => {
      const action = new SwitchToContext('foo', [], new BoundingBox(42, 42, 42, 42));
      expect(action.toJSON()).toEqual({
        className: 'SwitchToContext',
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42)
      });
    })
  })
});

describe('Type', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: Type', () => {
      const action = new Type('foo', [], new BoundingBox(42, 42, 42, 42), 'bar');
      expect(action.toJSON()).toEqual({
        className: 'Type',
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42),
        value: 'bar'
      });
    })
  })
});

describe('WaitForAddedHtmlElement', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: WaitForAddedHtmlElement', () => {
      const action = new WaitForAddedHtmlElement('foo', [], new BoundingBox(42, 42, 42, 42));
      expect(action.toJSON()).toEqual({
        className: 'WaitForAddedHtmlElement',
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42)
      });
    })
  })
});

describe('WaitForRemovedHtmlElement', () => {
  describe('toJSON', () => {
    test('when called, then the JSON should contain the ClassName: WaitForRemovedHtmlElement', () => {
      const action = new WaitForRemovedHtmlElement('foo', [], new BoundingBox(42, 42, 42, 42));
      expect(action.toJSON()).toEqual({
        className: 'WaitForRemovedHtmlElement',
        image: 'foo',
        locators: [],
        boundingBox: new BoundingBox(42, 42, 42, 42)
      });
    })
  })
});
