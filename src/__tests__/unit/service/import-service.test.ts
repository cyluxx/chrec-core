import { Action } from '../../../model/action/action';
import { Back } from '../../../model/action/back';
import { Forward } from '../../../model/action/forward';
import { GoTo } from '../../../model/action/go-to';
import { Clear } from '../../../model/action/html-element-action/clear';
import { Click } from '../../../model/action/html-element-action/click';
import { Read } from '../../../model/action/html-element-action/read';
import { Select } from '../../../model/action/html-element-action/select';
import { Submit } from '../../../model/action/html-element-action/submit';
import { SwitchToContext } from '../../../model/action/html-element-action/switch-to-context';
import { Type } from '../../../model/action/html-element-action/type';
import { WaitForAddedHtmlElement } from '../../../model/action/html-element-action/wait-for-added-html-element';
import { WaitForRemovedHtmlElement } from '../../../model/action/html-element-action/wait-for-removed-html-element';
import { Refresh } from '../../../model/action/refresh';
import { SwitchToDefaultContext } from '../../../model/action/switch-to-default-context';
import { BoundingBox } from '../../../model/bounding-box';
import { CssLocator } from '../../../model/locator/css-locator';
import { Method } from '../../../model/locator/locator';
import { XpathLocator } from '../../../model/locator/xpath-locator';
import { Project } from '../../../model/project';
import { Sequence } from '../../../model/sequence';
import { ImportService } from '../../../service/import.service';

describe('ImportService', () => {
  describe('validateChrecJson', () => {
    test('throws Error when invalid appName', () => {
      const importService = new ImportService();
      const json = `{"name":"invalid", "version":"0.0.1", "projects": []}`;
      const parsedJson = JSON.parse(json);

      expect(() => {
        importService.validateChrecJson(parsedJson);
      }).toThrow();
    });

    test('throws Error when invalid appVersion', () => {
      const importService = new ImportService();
      const json = `{"name":"chrec-core", "version":"999.999.999", "projects": []}`;
      const parsedJson = JSON.parse(json);

      expect(() => {
        importService.validateChrecJson(parsedJson);
      }).toThrow();
    });

    test('revives valid Project when valid appVersion and valid appName', () => {
      const importService = new ImportService();
      const json = `
      {
        "name": "ChRec",
        "version": "0.3.4",
        "project": {
          "name": "Project with all Actions",
          "sequences": [
            {
              "name": "Test Sequence",
              "actions": [
                {
                  "className": "Back",
                  "image": "foo"
                },
                {
                  "className": "Forward",
                  "image": "foo"
                },
                {
                  "className": "GoTo",
                  "image": "foo",
                  "url": "bar"
                },
                {
                  "className": "Refresh",
                  "image": "foo"
                },
                {
                  "className": "SwitchToDefaultContext",
                  "image": "foo"
                },
                {
                  "className": "Clear",
                  "image": "foo",
                  "locators": [
                    {
                      "className": "CssLocator",
                      "method": "CssSelectorGenerator",
                      "value": "foo"
                    },
                    {
                      "className": "XpathLocator",
                      "method": "RobulaPlus",
                      "value": "foo"
                    }
                  ],
                  "boundingBox": {
                    "x": 42,
                    "y": 42,
                    "width": 42,
                    "height": 42
                  }
                },
                {
                  "className": "Click",
                  "image": "foo",
                  "locators": [
                    {
                      "className": "CssLocator",
                      "method": "CssSelectorGenerator",
                      "value": "foo"
                    },
                    {
                      "className": "XpathLocator",
                      "method": "RobulaPlus",
                      "value": "foo"
                    }
                  ],
                  "boundingBox": {
                    "x": 42,
                    "y": 42,
                    "width": 42,
                    "height": 42
                  }
                },
                {
                  "className": "Read",
                  "image": "foo",
                  "value": "bar",
                  "locators": [
                    {
                      "className": "CssLocator",
                      "method": "CssSelectorGenerator",
                      "value": "foo"
                    },
                    {
                      "className": "XpathLocator",
                      "method": "RobulaPlus",
                      "value": "foo"
                    }
                  ],
                  "boundingBox": {
                    "x": 42,
                    "y": 42,
                    "width": 42,
                    "height": 42
                  }
                },
                {
                  "className": "Select",
                  "image": "foo",
                  "value": "bar",
                  "locators": [
                    {
                      "className": "CssLocator",
                      "method": "CssSelectorGenerator",
                      "value": "foo"
                    },
                    {
                      "className": "XpathLocator",
                      "method": "RobulaPlus",
                      "value": "foo"
                    }
                  ],
                  "boundingBox": {
                    "x": 42,
                    "y": 42,
                    "width": 42,
                    "height": 42
                  }
                },
                {
                  "className": "Submit",
                  "image": "foo",
                  "locators": [
                    {
                      "className": "CssLocator",
                      "method": "CssSelectorGenerator",
                      "value": "foo"
                    },
                    {
                      "className": "XpathLocator",
                      "method": "RobulaPlus",
                      "value": "foo"
                    }
                  ],
                  "boundingBox": {
                    "x": 42,
                    "y": 42,
                    "width": 42,
                    "height": 42
                  }
                },
                {
                  "className": "SwitchToContext",
                  "image": "foo",
                  "locators": [
                    {
                      "className": "CssLocator",
                      "method": "CssSelectorGenerator",
                      "value": "foo"
                    },
                    {
                      "className": "XpathLocator",
                      "method": "RobulaPlus",
                      "value": "foo"
                    }
                  ],
                  "boundingBox": {
                    "x": 42,
                    "y": 42,
                    "width": 42,
                    "height": 42
                  }
                },
                {
                  "className": "Type",
                  "image": "foo",
                  "key": "baz",
                  "value": "bar",
                  "locators": [
                    {
                      "className": "CssLocator",
                      "method": "CssSelectorGenerator",
                      "value": "foo"
                    },
                    {
                      "className": "XpathLocator",
                      "method": "RobulaPlus",
                      "value": "foo"
                    }
                  ],
                  "boundingBox": {
                    "x": 42,
                    "y": 42,
                    "width": 42,
                    "height": 42
                  }
                },
                {
                  "className": "WaitForAddedHtmlElement",
                  "image": "foo",
                  "timeout": 42,
                  "locators": [
                    {
                      "className": "CssLocator",
                      "method": "CssSelectorGenerator",
                      "value": "foo"
                    },
                    {
                      "className": "XpathLocator",
                      "method": "RobulaPlus",
                      "value": "foo"
                    }
                  ],
                  "boundingBox": {
                    "x": 42,
                    "y": 42,
                    "width": 42,
                    "height": 42
                  }
                },
                {
                  "className": "WaitForRemovedHtmlElement",
                  "image": "foo",
                  "timeout": 42,
                  "locators": [
                    {
                      "className": "CssLocator",
                      "method": "CssSelectorGenerator",
                      "value": "foo"
                    },
                    {
                      "className": "XpathLocator",
                      "method": "RobulaPlus",
                      "value": "foo"
                    }
                  ],
                  "boundingBox": {
                    "x": 42,
                    "y": 42,
                    "width": 42,
                    "height": 42
                  }
                }
              ]
            }
          ],
          "childTestResults": []
        }
      }
      `;
      const parsedJson = JSON.parse(json);

      const boundingBox = new BoundingBox(42, 42, 42, 42);
      const cssLocator = new CssLocator(Method.CSS_SELECTOR_GENERATOR, 'foo');
      const xpathLocator = new XpathLocator(Method.ROBULA_PLUS, 'foo');

      const actions: Action[] = [];
      actions.push(new Back('foo'));
      actions.push(new Forward('foo'));
      actions.push(new GoTo('foo', 'bar'));
      actions.push(new Refresh('foo'));
      actions.push(new SwitchToDefaultContext('foo'));
      actions.push(new Clear('foo', [cssLocator, xpathLocator], boundingBox));
      actions.push(new Click('foo', [cssLocator, xpathLocator], boundingBox));
      actions.push(new Read('foo', [cssLocator, xpathLocator], boundingBox, 'bar'));
      actions.push(new Select('foo', [cssLocator, xpathLocator], boundingBox, 'bar'));
      actions.push(new Submit('foo', [cssLocator, xpathLocator], boundingBox));
      actions.push(new SwitchToContext('foo', [cssLocator, xpathLocator], boundingBox));
      actions.push(new Type('foo', [cssLocator, xpathLocator], boundingBox, 'bar'));
      actions.push(new WaitForAddedHtmlElement('foo', [cssLocator, xpathLocator], boundingBox, 42));
      actions.push(new WaitForRemovedHtmlElement('foo', [cssLocator, xpathLocator], boundingBox, 42));
      const sequence = new Sequence('Test Sequence', actions);
      const project = new Project('Project with all Actions', [sequence], []);

      expect(importService.validateChrecJson(parsedJson)).toEqual(project);
    });
  });
});
