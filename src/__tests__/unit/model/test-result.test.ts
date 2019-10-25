import { instance, mock, when } from 'ts-mockito';
import { Clear } from '../../../model/action/html-element-action/clear';
import { Refresh } from '../../../model/action/refresh';
import { BoundingBox } from '../../../model/bounding-box';
import { Firefox } from '../../../model/browser/firefox';
import { CssLocator } from '../../../model/locator/css-locator';
import { Method } from '../../../model/locator/locator';
import { XpathLocator } from '../../../model/locator/xpath-locator';
import { Sequence } from '../../../model/sequence';
import { ActionTestResult } from '../../../model/test-result/action-test-result';
import { BrowserTestResult } from '../../../model/test-result/browser-test-result';
import { HtmlElementActionTestResult } from '../../../model/test-result/html-element-action-test-result';
import { LocatorTestResult } from '../../../model/test-result/locator-test-result';
import { ProjectTestResult } from '../../../model/test-result/project-test-result';
import { SequenceTestResult } from '../../../model/test-result/sequence-test-result';

describe('ActionTestResult', () => {
  describe('addChildTestResult', () => {
    test('should throw new Error', () => {
      const testResult = new ActionTestResult(new Refresh('foo'), false);

      expect(() => {
        testResult.addChildTestResult(testResult)
      }).toThrow();
    })
  })

  describe('isReplayable', () => {
    test('should return valid attribute', () => {
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
      browserTestResult.addChildTestResult(actionTestResult);

      expect(browserTestResult).toEqual(
        new BrowserTestResult(
          new Firefox('foo', 42, 42, 42), [htmlElementActionTestResult, actionTestResult])
      );
    })
  })
});

describe('HtmlElementActionTestResult', () => {
  describe('addChildTestResult', () => {
    test('when LocatorTestResult l, then return list of TestResults with l appended to the end', () => {
      const locatorTestResult = new LocatorTestResult(new CssLocator(Method.FINDER, 'bar'), false);
      const htmlElementActionTestResult = new HtmlElementActionTestResult(new Clear('foo', [], new BoundingBox(42, 42, 42, 42)), [locatorTestResult]);

      htmlElementActionTestResult.addChildTestResult(new LocatorTestResult(new XpathLocator(Method.ROBULA_PLUS, 'baz'), true));

      expect(htmlElementActionTestResult).toEqual(
        new HtmlElementActionTestResult(new Clear('foo', [], new BoundingBox(42, 42, 42, 42)),
          [locatorTestResult, new LocatorTestResult(new XpathLocator(Method.ROBULA_PLUS, 'baz'), true)]
        )
      );
    })
  })

  describe('isReplayable', () => {
    test('when no child LocatorTestResult is replayable, then return false', () => {
      const emptyChildTestResult = new HtmlElementActionTestResult(new Clear('foo', [], new BoundingBox(42, 42, 42, 42)), []);

      let mockedLocatorTestResult: LocatorTestResult = mock(LocatorTestResult);
      when(mockedLocatorTestResult.isReplayable()).thenReturn(false);
      mockedLocatorTestResult = instance(mockedLocatorTestResult);
      const falseChildTestResult = new HtmlElementActionTestResult(new Clear('foo', [], new BoundingBox(42, 42, 42, 42)), [mockedLocatorTestResult]);

      expect(emptyChildTestResult.isReplayable()).toBe(false);
      expect(falseChildTestResult.isReplayable()).toBe(false);
    })

    test('when at least one child LocatorTestResult is replayable, then return true', () => {
      let mockedLocatorTestResult: LocatorTestResult = mock(LocatorTestResult);
      when(mockedLocatorTestResult.isReplayable()).thenReturn(true);
      mockedLocatorTestResult = instance(mockedLocatorTestResult);
      const trueChildTestResult = new HtmlElementActionTestResult(new Clear('foo', [], new BoundingBox(42, 42, 42, 42)), [mockedLocatorTestResult]);

      expect(trueChildTestResult.isReplayable()).toBe(true);
    })
  })
});

describe('LocatorTestRestult', () => {
  describe('addChildTestResult', () => {
    test('should throw new Error', () => {
      const testResult = new LocatorTestResult(new CssLocator(Method.FINDER, 'bar'), false);

      expect(() => {
        testResult.addChildTestResult(testResult);
      }).toThrow();
    })
  })

  describe('isReplayable', () => {
    test('should return valid attribute', () => {
      const testResultFalse = new LocatorTestResult(new CssLocator(Method.FINDER, 'foo'), false);
      const testResultTrue = new LocatorTestResult(new CssLocator(Method.FINDER, 'bar'), true);

      expect(testResultFalse.isReplayable()).toBe(false);
      expect(testResultTrue.isReplayable()).toBe(true);
    })
  })

  describe('getSuccessfulLocatorCount', () => {
    test('when not valid, then return 0', () => {
      const testResultFalse = new LocatorTestResult(new CssLocator(Method.FINDER, 'foo'), false);

      expect(testResultFalse.getSuccessfulLocatorCount()).toBe(0);
    })

    test('when valid, then return 1', () => {
      const testResultTrue = new LocatorTestResult(new CssLocator(Method.FINDER, 'bar'), true);

      expect(testResultTrue.getSuccessfulLocatorCount()).toBe(1);
    })
  })

  describe('getTotalLocatorCount', () => {
    test('should return 1', () => {
      const testResultFalse = new LocatorTestResult(new CssLocator(Method.FINDER, 'foo'), false);

      expect(testResultFalse.getTotalLocatorCount()).toBe(1);
    })
  })

  describe('calculateBestLocatorMethods', () => {
    test('when not valid, then return empty list', () => {
      const testResultFalse = new LocatorTestResult(new CssLocator(Method.FINDER, 'foo'), false);

      expect(testResultFalse.calculateBestLocatorMethods()).toEqual([]);
    })

    test('when valid, then return list containing only one element, hence its corresponding locator', () => {
      const testResultTrue = new LocatorTestResult(new CssLocator(Method.FINDER, 'foo'), true);

      expect(testResultTrue.calculateBestLocatorMethods().length).toBe(1);
      expect(testResultTrue.calculateBestLocatorMethods()).toEqual([new CssLocator(Method.FINDER, 'foo')]);
    })
  })

  describe('getSpecificSuccessfulLocatorCount', () => {
    test('when not valid, then return 0', () => {
      const testResultFalse = new LocatorTestResult(new CssLocator(Method.CSS_SELECTOR_GENERATOR, 'foo'), false);

      expect(testResultFalse.getSpecificSuccessfulLocatorCount(Method.CSS_SELECTOR_GENERATOR)).toBe(0);
    })

    test('when Method of corresponding Locator does not match, then return 0', () => {
      const testResultFalse = new LocatorTestResult(new CssLocator(Method.FINDER, 'foo'), false);

      expect(testResultFalse.getSpecificSuccessfulLocatorCount(Method.CSS_SELECTOR_GENERATOR)).toBe(0);
    })

    test('when valid and Method of corresponding Locator matches, then return 1', () => {
      const testResultTrue = new LocatorTestResult(new CssLocator(Method.CSS_SELECTOR_GENERATOR, 'foo'), true);

      expect(testResultTrue.getSpecificSuccessfulLocatorCount(Method.CSS_SELECTOR_GENERATOR)).toBe(1);
    })
  })
});

describe('ProjectTestResult', () => {
  describe('addChildTestResult', () => {
    test('when sequenceTestResult s, then return list of TestResults with s appended to the end', () => {
      const date = new Date();
      const sequenceTestResult = new SequenceTestResult(new Sequence('bar', []), []);
      const projectTestResult = new ProjectTestResult(date, [sequenceTestResult]);

      projectTestResult.addChildTestResult(new SequenceTestResult(new Sequence('foo', []), []));

      expect(projectTestResult).toEqual(
        new ProjectTestResult(date, [sequenceTestResult, new SequenceTestResult(new Sequence('foo', []), [])])
      );
    })
  })
});

describe('SequenceTestResult', () => {
  describe('addChildTestResult', () => {
    test('when browserTestResult b, then return list of TestResults with b appended to the end', () => {
      const browserTestResult = new BrowserTestResult(new Firefox('foo', 42, 42, 42), []);
      const sequenceTestResult = new SequenceTestResult(new Sequence('bar', []), [browserTestResult]);
      sequenceTestResult.addChildTestResult(new BrowserTestResult(new Firefox('baz', 42, 42, 42), []));

      expect(sequenceTestResult).toEqual(
        new SequenceTestResult(new Sequence('bar', []), [browserTestResult, new BrowserTestResult(new Firefox('baz', 42, 42, 42), [])])
      );
    })
  })
});

describe('TestResult', () => {
  describe('isReplayable', () => {
    test('when at least one childTestResult is not replayable, then return false', () => {
      let mockedBrowserTestResult: BrowserTestResult = mock(BrowserTestResult);
      when(mockedBrowserTestResult.isReplayable()).thenReturn(false);
      mockedBrowserTestResult = instance(mockedBrowserTestResult);
      const falseTestResult = new SequenceTestResult(new Sequence('bar', []), [mockedBrowserTestResult]);

      expect(falseTestResult.isReplayable()).toBe(false);
    })

    test('when all childTestResults are replayable, then return false', () => {
      const emptyChildTestResult = new SequenceTestResult(new Sequence('bar', []), []);

      let mockedBrowserTestResult: BrowserTestResult = mock(BrowserTestResult);
      when(mockedBrowserTestResult.isReplayable()).thenReturn(true);
      mockedBrowserTestResult = instance(mockedBrowserTestResult);
      const trueTestResult = new SequenceTestResult(new Sequence('bar', []), [mockedBrowserTestResult]);

      expect(emptyChildTestResult.isReplayable()).toBe(true);
      expect(trueTestResult.isReplayable()).toBe(true);
    })
  })

  describe('getSuccessfulLocatorCount', () => {
    test('when the sum of successfulLocatorCount of childTestResult is 3, then return 3', () => {
      let mockedBrowserTestResult1: BrowserTestResult = mock(BrowserTestResult);
      when(mockedBrowserTestResult1.getSuccessfulLocatorCount()).thenReturn(1);
      mockedBrowserTestResult1 = instance(mockedBrowserTestResult1);

      let mockedBrowserTestResult2: BrowserTestResult = mock(BrowserTestResult);
      when(mockedBrowserTestResult2.getSuccessfulLocatorCount()).thenReturn(2);
      mockedBrowserTestResult2 = instance(mockedBrowserTestResult2);

      const testResult = new SequenceTestResult(new Sequence('bar', []), [mockedBrowserTestResult1, mockedBrowserTestResult2]);

      expect(testResult.getSuccessfulLocatorCount()).toBe(3);
    })
  })

  describe('getTotalLocatorCount', () => {
    test('when the sum of totalLocatorCount of childTestResult is 3, then return 3', () => {
      let mockedBrowserTestResult1: BrowserTestResult = mock(BrowserTestResult);
      when(mockedBrowserTestResult1.getTotalLocatorCount()).thenReturn(1);
      mockedBrowserTestResult1 = instance(mockedBrowserTestResult1);

      let mockedBrowserTestResult2: BrowserTestResult = mock(BrowserTestResult);
      when(mockedBrowserTestResult2.getTotalLocatorCount()).thenReturn(2);
      mockedBrowserTestResult2 = instance(mockedBrowserTestResult2);

      const testResult = new SequenceTestResult(new Sequence('bar', []), [mockedBrowserTestResult1, mockedBrowserTestResult2]);

      expect(testResult.getTotalLocatorCount()).toBe(3);
    })
  })

  describe('calculateBestLocatorMethods', () => {
    test('when two lists of Locators, then return concatenated list', () => {
      let mockedBrowserTestResult1: BrowserTestResult = mock(BrowserTestResult);
      when(mockedBrowserTestResult1.calculateBestLocatorMethods()).thenReturn([new CssLocator(Method.FINDER, 'foo')]);
      mockedBrowserTestResult1 = instance(mockedBrowserTestResult1);

      let mockedBrowserTestResult2: BrowserTestResult = mock(BrowserTestResult);
      when(mockedBrowserTestResult2.calculateBestLocatorMethods()).thenReturn(
        [new CssLocator(Method.OPTIMAL_SELECT, 'bar'), new XpathLocator(Method.ROBULA_PLUS, 'baz')]);
      mockedBrowserTestResult2 = instance(mockedBrowserTestResult2);

      const testResult = new SequenceTestResult(new Sequence('foobar', []), [mockedBrowserTestResult1, mockedBrowserTestResult2]);

      expect(testResult.calculateBestLocatorMethods().length).toBe(3);
      expect(testResult.calculateBestLocatorMethods()).toEqual([
        new CssLocator(Method.FINDER, 'foo'),
        new CssLocator(Method.OPTIMAL_SELECT, 'bar'),
        new XpathLocator(Method.ROBULA_PLUS, 'baz')
      ]);
    })
  })

  describe('getSpecificSuccessfulLocatorCount', () => {
    test('when the sum of specificSuccessfulLocatorCount of childTestResult is 3, then return 3', () => {
      let mockedBrowserTestResult1: BrowserTestResult = mock(BrowserTestResult);
      when(mockedBrowserTestResult1.getSpecificSuccessfulLocatorCount(Method.FINDER)).thenReturn(1);
      mockedBrowserTestResult1 = instance(mockedBrowserTestResult1);

      let mockedBrowserTestResult2: BrowserTestResult = mock(BrowserTestResult);
      when(mockedBrowserTestResult2.getSpecificSuccessfulLocatorCount(Method.FINDER)).thenReturn(2);
      mockedBrowserTestResult2 = instance(mockedBrowserTestResult2);

      const testResult = new SequenceTestResult(new Sequence('bar', []), [mockedBrowserTestResult1, mockedBrowserTestResult2]);

      expect(testResult.getSpecificSuccessfulLocatorCount(Method.FINDER)).toBe(3);
    })
  })
});
