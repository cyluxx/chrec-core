import * as path from 'path';
import { GoTo } from '../../../model/action/browser-action/go-to';
import { Refresh } from '../../../model/action/browser-action/refresh';
import { Click } from '../../../model/action/html-element-action/click';
import { BoundingBox } from '../../../model/bounding-box';
import { Method } from '../../../model/locator';
import { CssLocator } from '../../../model/locator/css-locator';
import { XpathLocator } from '../../../model/locator/xpath-locator';
import { Project } from '../../../model/project';
import { Sequence } from '../../../model/sequence';
import { ChrecJsonService } from '../../../service/chrec-json.service';
import { HtmlElementAction } from '../../../model/action/html-element-action';

describe('ChrecJsonService', () => {
  describe('exportChrecJson', () => {
    test('when Project, then JSON File containing application name, its version and the passed Project', async () => {
      const service = new ChrecJsonService();
      const absolutePath = path.resolve('../assets/chrec-export.json');
      expect.assertions(1);
      await expect(service.exportChrecJson(absolutePath, new Project('projectName', []))).resolves.toEqual(undefined);
    });
  });

  describe('importFromChrecJson', () => {
    test('returns project with valid Refresh Action', async () => {
      const service = new ChrecJsonService();
      expect.assertions(7);

      const imported: Project = await service.importChrecJson(
        'src/__tests__/integration/assets/project-with-refresh.json',
      );

      expect(imported.name).toEqual('Project With Refresh');
      expect(imported.sequences).toHaveLength(1);
      expect(imported.sequences[0].name).toEqual('Test Sequence');
      expect(imported.sequences[0].actions).toHaveLength(1);
      expect(imported.sequences[0].actions[0]).toBeInstanceOf(Refresh);
      expect(imported.sequences[0].actions[0].image).toEqual('foo');
      expect(imported.sequences[0].actions[0].testResults).toEqual([]);
    });

    test('returns project with valid GoTo Action', async () => {
      const service = new ChrecJsonService();
      expect.assertions(7);

      const imported: Project = await service.importChrecJson(
        'src/__tests__/integration/assets/project-with-goto.json',
      );

      expect(imported.name).toEqual('Project With GoTo');
      expect(imported.sequences).toHaveLength(1);
      expect(imported.sequences[0].name).toEqual('Test Sequence');
      expect(imported.sequences[0].actions).toHaveLength(1);
      expect(imported.sequences[0].actions[0]).toBeInstanceOf(GoTo);
      expect(imported.sequences[0].actions[0].image).toEqual('foo');
      expect(imported.sequences[0].actions[0].testResults).toEqual([]);
    });

    test('returns project with valid Click Action', async () => {
      const service = new ChrecJsonService();
      expect.assertions(8);

      const imported: Project = await service.importChrecJson(
        'src/__tests__/integration/assets/project-with-click.json',
      );

      expect(imported.name).toEqual('Project With Click, an XpathLocator and a CssLocator');
      expect(imported.sequences).toHaveLength(1);
      expect(imported.sequences[0].name).toEqual('Test Sequence');
      expect(imported.sequences[0].actions).toHaveLength(1);
      expect(imported.sequences[0].actions[0]).toBeInstanceOf(Click);
      expect(imported.sequences[0].actions[0].image).toEqual('foo');
      expect(imported.sequences[0].actions[0].testResults).toEqual([]);
      expect((imported.sequences[0].actions[0] as HtmlElementAction).locators).toHaveLength(2);
    });

    test('returns valid Project with correctly typed objects', async () => {
      const service = new ChrecJsonService();
      expect.assertions(1);

      const imported: Project = await service.importChrecJson(
        'src/__tests__/integration/assets/project-with-all-actions.json',
      );

      expect(imported).toBeInstanceOf(Project);
    });
  });
});
