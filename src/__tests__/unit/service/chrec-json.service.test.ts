import { Action } from '../../../model/action';
import { BrowserActionTestResult } from '../../../model/action-test-result/browser-action-test-result';
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
import { Edge } from '../../../model/browser/edge';
import { Method } from '../../../model/locator';
import { CssLocator } from '../../../model/locator/css-locator';
import { XpathLocator } from '../../../model/locator/xpath-locator';
import { Project } from '../../../model/project';
import { Sequence } from '../../../model/sequence';
import { ChrecJsonService } from '../../../service/chrec-json.service';
import { HtmlElementActionTestResult } from '../../../model/action-test-result/html-element-action-test-result';

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
      const json = `{"name":"ChRec", "version":"0.1.0", "project": {"name": "foo", "sequences": []}}`;
      const parsedJson = JSON.parse(json);

      expect(service.validateChrecJson(parsedJson)).toEqual(new Project('foo', []));
    });
  });

  describe('reviveProject', () => {
    test('when correct json, then revive Project', () => {
      const json = `{"name": "foo", "sequences": [{"name": "bar", "actions": []}]}`;
      const parsedJson = JSON.parse(json);

      expect(service.reviveProject(parsedJson)).toEqual(new Project('foo', [new Sequence('bar', [])]));
    });
  });

  describe('reviveSequence', () => {
    test('when correct json, then revive Sequence', () => {
      const json = `{"name": "foo", "actions": [{"className": "Back", "testResults": [], "image": "bar"}]}`;
      const parsedJson = JSON.parse(json);

      expect(service.reviveSequence(parsedJson)).toEqual(new Sequence('foo', [new Back([], 'bar')]));
    });
  });

  describe('reviveAction', () => {
    test('when correct json with Back, then revive Action', () => {
      const json = `{"className": "Back", "testResults": 
      [{"browser": {"className": "Edge", "name": "foo", "width": 42, "height": 42, "sleepMsBetweenActions": 42}, "replayable": true}],
      "image": "bar"}`;
      const parsedJson = JSON.parse(json);

      expect(service.reviveAction(parsedJson)).toEqual(
        new Back([new BrowserActionTestResult(new Edge('foo', 42, 42, 42), true)], 'bar')
      )
    });

    test('when correct json with Forward, then revive Action', () => {
      const json = `{"className": "Forward", "testResults": 
      [{"browser": {"className": "Edge", "name": "foo", "width": 42, "height": 42, "sleepMsBetweenActions": 42}, "replayable": true}],
      "image": "bar"}`;
      const parsedJson = JSON.parse(json);

      expect(service.reviveAction(parsedJson)).toEqual(
        new Forward([new BrowserActionTestResult(new Edge('foo', 42, 42, 42), true)], 'bar')
      )
    });

    test('when correct json with GoTo, then revive Action', () => {
      const json = `{"className": "GoTo", "testResults": 
      [{"browser": {"className": "Edge", "name": "foo", "width": 42, "height": 42, "sleepMsBetweenActions": 42}, "replayable": true}],
      "image": "bar", "url": "baz"}`;
      const parsedJson = JSON.parse(json);

      expect(service.reviveAction(parsedJson)).toEqual(
        new GoTo([new BrowserActionTestResult(new Edge('foo', 42, 42, 42), true)], 'bar', 'baz')
      )
    });

    test('when correct json with Refresh, then revive Action', () => {
      const json = `{"className": "Refresh", "testResults": 
      [{"browser": {"className": "Edge", "name": "foo", "width": 42, "height": 42, "sleepMsBetweenActions": 42}, "replayable": true}],
      "image": "bar"}`;
      const parsedJson = JSON.parse(json);

      expect(service.reviveAction(parsedJson)).toEqual(
        new Refresh([new BrowserActionTestResult(new Edge('foo', 42, 42, 42), true)], 'bar')
      )
    });

    test('when correct json with SwitchToDefaultContext, then revive Action', () => {
      const json = `{"className": "SwitchToDefaultContext", "testResults": 
      [{"browser": {"className": "Edge", "name": "foo", "width": 42, "height": 42, "sleepMsBetweenActions": 42}, "replayable": true}],
      "image": "bar"}`;
      const parsedJson = JSON.parse(json);

      expect(service.reviveAction(parsedJson)).toEqual(
        new SwitchToDefaultContext([new BrowserActionTestResult(new Edge('foo', 42, 42, 42), true)], 'bar')
      )
    });

    // test('when correct json with Clear, then revive Action', () => {
    //   const json = `{"className": "Clear",
    //   "testResults": [{"browser": {"className": "Edge", "name": "foo", "width": 42, "height": 42, "sleepMsBetweenActions": 42}}],
    //   "image": "bar",
    //   "locators": ["className": "XpathLocator"]}`;
    //   const parsedJson = JSON.parse(json);

    //   expect(service.reviveAction(parsedJson)).toEqual(
    //     new Clear(
    //       [new HtmlElementActionTestResult(new Edge('foo', 42, 42, 42))],
    //       'bar',
    //       [new XpathLocator([], Method.ROBULA_PLUS, 'baz')],
    //       new BoundingBox(42, 42, 42, 42)
    //     )
    //   )
    // });
  });
});
