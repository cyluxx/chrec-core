import { Action } from '../../../model/action';
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
import { Method } from '../../../model/locator';
import { CssLocator } from '../../../model/locator/css-locator';
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
  });
});
