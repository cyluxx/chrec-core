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

describe('ChrecJsonService', () => {
  describe('exportChrecJson', () => {
    test('when Project, then JSON File containing application name, its version and the passed Project', async () => {
      const service = new ChrecJsonService();
      const absolutePath = path.resolve('../assets/chrec-export.json');
      expect.assertions(1);
      await expect(service.exportChrecJson(absolutePath, new Project('projectName', []))).resolves.toEqual(
        undefined,
      );
    });
  });

  describe('importFromChrecJson', () => {
    test('returns project with valid Refresh Action', async () => {
      const service = new ChrecJsonService();
      expect.assertions(3);

      const action = new Refresh([], 'foo');
      const sequence = new Sequence('Test Sequence', [action]);
      const project = new Project('Project With Refresh', [sequence]);

      const imported: Project = await service.importChrecJson(
        'src/__tests__/integration/assets/project-with-refresh.json',
      );

      expect(imported).toEqual(project);
      expect(imported.sequences[0]).toEqual(sequence);
      expect(imported.sequences[0].actions[0]).toEqual(action);
    });

    test('returns project with valid GoTo Action', async () => {
      const service = new ChrecJsonService();
      expect.assertions(1);

      const project: Project = await service.importChrecJson(
        'src/__tests__/integration/assets/project-with-goto.json',
      );

      expect(project.sequences[0].actions[0]).toEqual(new GoTo([], 'foo', 'https://www.github.com'));
    });

    test('returns project with valid Click Action', async () => {
      const service = new ChrecJsonService();
      expect.assertions(1);

      const project: Project = await service.importChrecJson(
        'src/__tests__/integration/assets/project-with-click.json',
      );

      expect(project.sequences[0].actions[0]).toEqual(
        new Click(
          [],
          'foo',
          [new CssLocator([], Method.CSS_SELECTOR_GENERATOR, 'foo'), new XpathLocator([], Method.ROBULA_PLUS, 'foo')],
          new BoundingBox(42, 42, 42, 42),
        ),
      );
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
