import { Clear } from '../../../model/action/html-element-action/clear';
import { Refresh } from '../../../model/action/refresh';
import { BoundingBox } from '../../../model/bounding-box';
import { Firefox } from '../../../model/browser/firefox';
import { ActionTestResult } from '../../../model/test-result/action-test-result';
import { BrowserTestResult } from '../../../model/test-result/browser-test-result';
import { HtmlElementActionTestResult } from '../../../model/test-result/html-element-action-test-result';

describe('ActionTestResult', () => {
  describe('addChildTestResult', () => {
    test('throw new Error', () => {
      const testResult = new ActionTestResult(new Refresh('foo'), false);

      expect(() => {
        testResult.addChildTestResult(new ActionTestResult(new Refresh('foo'), false))
      }).toThrow();
    })
  })

  describe('isReplayable', () => {
    test('return valid attribute', () => {
      const testResultFalse = new ActionTestResult(new Refresh('foo'), false);
      const testResultTrue = new ActionTestResult(new Refresh('foo'), true);

      expect(testResultFalse.isReplayable()).toBe(false);
      expect(testResultTrue.isReplayable()).toBe(true);
    })
  })
});

describe('BrowserTestResult', () => {
  describe('addChildTestResult', () => {
    test('when ActionTestResult a, then return list of TestResults with a appended to the end', () => {
      const htmlElementActionTestResult = new HtmlElementActionTestResult(new Clear('bar', [], new BoundingBox(42, 42, 42, 42)), []);
      const browserTestResult = new BrowserTestResult(new Firefox('foo', 42, 42, 42), [htmlElementActionTestResult]);
      const actionTestResult = new ActionTestResult(new Refresh('baz'), false);
      browserTestResult.addChildTestResult(actionTestResult)

      expect(browserTestResult).toEqual(
        new BrowserTestResult(
          new Firefox('foo', 42, 42, 42), [htmlElementActionTestResult, actionTestResult])
      );
    })
  })
});