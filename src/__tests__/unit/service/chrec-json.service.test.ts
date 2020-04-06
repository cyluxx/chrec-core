import { BrowserActionTestResult } from '../../../model/action-test-result/browser-action-test-result';
import { HtmlElementActionTestResult } from '../../../model/action-test-result/html-element-action-test-result';
import { Back } from '../../../model/action/browser-action/back';
import { Forward } from '../../../model/action/browser-action/forward';
import { GoTo } from '../../../model/action/browser-action/go-to';
import { Refresh } from '../../../model/action/browser-action/refresh';
import { SwitchToDefaultContext } from '../../../model/action/browser-action/switch-to-default-context';
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
import { Chrome } from '../../../model/browser/chrome';
import { Edge } from '../../../model/browser/edge';
import { Firefox } from '../../../model/browser/firefox';
import { InternetExplorer } from '../../../model/browser/internet-explorer';
import { Method } from '../../../model/locator';
import { LocatorTestResult } from '../../../model/locator-test-result';
import { CssLocator } from '../../../model/locator/css-locator';
import { XpathLocator } from '../../../model/locator/xpath-locator';
import { Project } from '../../../model/project';
import { Sequence } from '../../../model/sequence';
import { ChrecJsonService } from '../../../service/chrec-json.service';

let service: ChrecJsonService;

beforeAll(() => {
  service = new ChrecJsonService();
});

describe('ChrecJsonService', () => {
  describe('validateChrecJson', () => {
    test('when invalid appName, then throw error', () => {
      const json = `{"name":"invalid", "version":"0.0.1"}`;
      const parsedJson = JSON.parse(json);

      expect(() => {
        service.validateChrecJson(parsedJson);
      }).toThrow('Invalid ChRec JSON');
    });

    test('when appVersion < json.version, then throw error', () => {
      const json = `{"name":"ChRec", "version":"999.999.999"}`;
      const parsedJson = JSON.parse(json);

      expect(() => {
        service.validateChrecJson(parsedJson);
      }).toThrow('Incompatible Versions. Please Upgrade your ChRec version!');
    });

    test('when valid appName and appVersion >= json.version, then revive Project', () => {
      const project = new Project('foo', []);
      const parsedJson = JSON.parse(JSON.stringify({ name: 'ChRec', version: '0.1.0', project }));

      expect(service.validateChrecJson(parsedJson)).toEqual(project);
    });
  });

  describe('reviveProject', () => {
    test('when correct json, then revive Project', () => {
      const project = new Project('foo', [new Sequence('bar', [])]);
      const parsedJson = JSON.parse(JSON.stringify(project));

      expect(service.reviveProject(parsedJson)).toEqual(project);
    });
  });

  describe('reviveSequence', () => {
    test('when correct json, then revive Sequence', () => {
      const sequence = new Sequence('foo', [new Back([], 'bar')]);
      const parsedJson = JSON.parse(JSON.stringify(sequence));

      expect(service.reviveSequence(parsedJson)).toEqual(sequence);
    });
  });

  describe('reviveAction', () => {
    test('when correct json with Back, then revive Action', () => {
      const action = new Back([new BrowserActionTestResult(new Edge('foo', 42, 42, 42), true)], 'bar');
      const parsedJson = JSON.parse(JSON.stringify(action));

      expect(service.reviveAction(parsedJson)).toEqual(action);
    });

    test('when correct json with Forward, then revive Action', () => {
      const action = new Forward([new BrowserActionTestResult(new Edge('foo', 42, 42, 42), true)], 'bar');
      const parsedJson = JSON.parse(JSON.stringify(action));

      expect(service.reviveAction(parsedJson)).toEqual(action);
    });

    test('when correct json with GoTo, then revive Action', () => {
      const action = new GoTo([new BrowserActionTestResult(new Edge('foo', 42, 42, 42), true)], 'bar', 'baz');
      const parsedJson = JSON.parse(JSON.stringify(action));

      expect(service.reviveAction(parsedJson)).toEqual(action);
    });

    test('when correct json with Refresh, then revive Action', () => {
      const action = new Refresh([new BrowserActionTestResult(new Edge('foo', 42, 42, 42), true)], 'bar');
      const parsedJson = JSON.parse(JSON.stringify(action));

      expect(service.reviveAction(parsedJson)).toEqual(action);
    });

    test('when correct json with SwitchToDefaultContext, then revive Action', () => {
      const action = new SwitchToDefaultContext(
        [new BrowserActionTestResult(new Edge('foo', 42, 42, 42), true)],
        'bar',
      );
      const parsedJson = JSON.parse(JSON.stringify(action));

      expect(service.reviveAction(parsedJson)).toEqual(action);
    });

    test('when correct json with Clear, then revive Action', () => {
      const action = new Clear(
        [new HtmlElementActionTestResult(new Edge('foo', 42, 42, 42))],
        'bar',
        [new XpathLocator([], Method.ROBULA_PLUS, 'baz')],
        new BoundingBox(42, 42, 42, 42),
      );
      const parsedJson = JSON.parse(JSON.stringify(action));

      expect(service.reviveAction(parsedJson)).toEqual(action);
    });

    test('when correct json with Click, then revive Action', () => {
      const action = new Click(
        [new HtmlElementActionTestResult(new Edge('foo', 42, 42, 42))],
        'bar',
        [new XpathLocator([], Method.ROBULA_PLUS, 'baz')],
        new BoundingBox(42, 42, 42, 42),
      );
      const parsedJson = JSON.parse(JSON.stringify(action));

      expect(service.reviveAction(parsedJson)).toEqual(action);
    });

    test('when correct json with Read, then revive Action', () => {
      const action = new Read(
        [new HtmlElementActionTestResult(new Edge('foo', 42, 42, 42))],
        'bar',
        [new XpathLocator([], Method.ROBULA_PLUS, 'baz')],
        new BoundingBox(42, 42, 42, 42),
        'lol',
      );
      const parsedJson = JSON.parse(JSON.stringify(action));

      expect(service.reviveAction(parsedJson)).toEqual(action);
    });

    test('when correct json with Select, then revive Action', () => {
      const action = new Select(
        [new HtmlElementActionTestResult(new Edge('foo', 42, 42, 42))],
        'bar',
        [new XpathLocator([], Method.ROBULA_PLUS, 'baz')],
        new BoundingBox(42, 42, 42, 42),
        'lol',
      );
      const parsedJson = JSON.parse(JSON.stringify(action));

      expect(service.reviveAction(parsedJson)).toEqual(action);
    });

    test('when correct json with Submit, then revive Action', () => {
      const action = new Submit(
        [new HtmlElementActionTestResult(new Edge('foo', 42, 42, 42))],
        'bar',
        [new XpathLocator([], Method.ROBULA_PLUS, 'baz')],
        new BoundingBox(42, 42, 42, 42),
      );
      const parsedJson = JSON.parse(JSON.stringify(action));

      expect(service.reviveAction(parsedJson)).toEqual(action);
    });

    test('when correct json with SwitchToContext, then revive Action', () => {
      const action = new SwitchToContext(
        [new HtmlElementActionTestResult(new Edge('foo', 42, 42, 42))],
        'bar',
        [new XpathLocator([], Method.ROBULA_PLUS, 'baz')],
        new BoundingBox(42, 42, 42, 42),
      );
      const parsedJson = JSON.parse(JSON.stringify(action));

      expect(service.reviveAction(parsedJson)).toEqual(action);
    });

    test('when correct json with Type, then revive Action', () => {
      const action = new Type(
        [new HtmlElementActionTestResult(new Edge('foo', 42, 42, 42))],
        'bar',
        [new XpathLocator([], Method.ROBULA_PLUS, 'baz')],
        new BoundingBox(42, 42, 42, 42),
        'lol',
      );
      const parsedJson = JSON.parse(JSON.stringify(action));

      expect(service.reviveAction(parsedJson)).toEqual(action);
    });

    test('when correct json with WaitForAddedHtmlElement, then revive Action', () => {
      const action = new WaitForAddedHtmlElement(
        [new HtmlElementActionTestResult(new Edge('foo', 42, 42, 42))],
        'bar',
        [new XpathLocator([], Method.ROBULA_PLUS, 'baz')],
        new BoundingBox(42, 42, 42, 42),
      );
      const parsedJson = JSON.parse(JSON.stringify(action));

      expect(service.reviveAction(parsedJson)).toEqual(action);
    });

    test('when correct json with WaitForRemovedHtmlElement, then revive Action', () => {
      const action = new WaitForRemovedHtmlElement(
        [new HtmlElementActionTestResult(new Edge('foo', 42, 42, 42))],
        'bar',
        [new XpathLocator([], Method.ROBULA_PLUS, 'baz')],
        new BoundingBox(42, 42, 42, 42),
      );
      const parsedJson = JSON.parse(JSON.stringify(action));

      expect(service.reviveAction(parsedJson)).toEqual(action);
    });

    test('when invalid ClassName, then throw Error', () => {
      const json = `{
        "className": "invalid",
        "testResults": [{"browser": {"className": "Edge", "name": "foo", "width": 42, "height": 42, "sleepMsBetweenActions": 42}}],
        "image": "bar",
        "locators": [{"className": "XpathLocator", "testResults": [], "method": "RobulaPlus", "value": "baz"}],
        "boundingBox": {"x": 42, "y": 42, "width": 42, "height": 42}
      }`;
      const parsedJson = JSON.parse(json);

      expect(() => service.reviveAction(parsedJson)).toThrow(
        'Internal: Could not revive HtmlElementAction with className invalid from JSON!',
      );
    });
  });

  describe('reviveBoundingBox', () => {
    test('when correct json, then revive BoundingBox', () => {
      const json = `{"x": 42, "y": 42, "width": 42, "height": 42}`;
      const parsedJson = JSON.parse(json);

      expect(service.reviveBoundingBox(parsedJson)).toEqual(new BoundingBox(42, 42, 42, 42));
    });
  });

  describe('reviveLocator', () => {
    test('when correct json with CssLocator, then revive Locator', () => {
      const locator = new CssLocator([new LocatorTestResult(true)], Method.FINDER, 'baz');
      const parsedJson = JSON.parse(JSON.stringify(locator));

      expect(service.reviveLocator(parsedJson)).toEqual(locator);
    });

    test('when correct json with XpathLocator, then revive Locator', () => {
      const locator = new XpathLocator([new LocatorTestResult(true)], Method.ROBULA_PLUS, 'baz');
      const parsedJson = JSON.parse(JSON.stringify(locator));

      expect(service.reviveLocator(parsedJson)).toEqual(locator);
    });

    test('when invalid ClassName, then throw Error', () => {
      const json = `{"className": "invalid", "testResults": [{"replayable": true}], "method": "RobulaPlus", "value": "baz"}`;
      const parsedJson = JSON.parse(json);

      expect(() => service.reviveLocator(parsedJson)).toThrow('Could not revive Locator from JSON!');
    });
  });

  describe('reviveLocatorTestResult', () => {
    test('when correct json, then revive LocatorTestResult', () => {
      const testResult = new LocatorTestResult(false);
      const parsedJson = JSON.parse(JSON.stringify(testResult));

      expect(service.reviveLocatorTestResult(parsedJson)).toEqual(testResult);
    });
  });

  describe('reviveBrowserActionTestResult', () => {
    test('when correct json, then revive BrowserActionTestResult', () => {
      const testResult = new BrowserActionTestResult(new Edge('foo', 42, 42, 42), false);
      const parsedJson = JSON.parse(JSON.stringify(testResult));

      expect(service.reviveBrowserActionTestResult(parsedJson)).toEqual(testResult);
    });
  });

  describe('reviveHtmlElementActionTestResult', () => {
    test('when correct json, then revive HtmlElementActionTestResult', () => {
      const testResult = new HtmlElementActionTestResult(new Edge('foo', 42, 42, 42));
      const parsedJson = JSON.parse(JSON.stringify(testResult));

      expect(service.reviveHtmlElementActionTestResult(parsedJson)).toEqual(testResult);
    });
  });

  describe('reviveBrowser', () => {
    test('when correct json with Chrome, then revive Browser', () => {
      const browser = new Chrome('foo', 42, 42, 42);
      const parsedJson = JSON.parse(JSON.stringify(browser));

      expect(service.reviveBrowser(parsedJson)).toEqual(browser);
    });

    test('when correct json with Edge, then revive Browser', () => {
      const browser = new Edge('foo', 42, 42, 42);
      const parsedJson = JSON.parse(JSON.stringify(browser));

      expect(service.reviveBrowser(parsedJson)).toEqual(browser);
    });

    test('when correct json with Firefox, then revive Browser', () => {
      const browser = new Firefox('foo', 42, 42, 42);
      const parsedJson = JSON.parse(JSON.stringify(browser));

      expect(service.reviveBrowser(parsedJson)).toEqual(browser);
    });

    test('when correct json with InternetExplorer, then revive Browser', () => {
      const browser = new InternetExplorer('foo', 42, 42, 42);
      const parsedJson = JSON.parse(JSON.stringify(browser));

      expect(service.reviveBrowser(parsedJson)).toEqual(browser);
    });

    test('when invalid ClassName, then throw Error', () => {
      const json = `{"className": "invalid", "name": "foo", "width": 42, "height": 42, "sleepMsBetweenActions": 42}`;
      const parsedJson = JSON.parse(json);

      expect(() => service.reviveBrowser(parsedJson)).toThrow('Could not construct Browser from ChRec JSON!');
    });
  });
});
