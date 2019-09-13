import { GoTo } from '../../../model/action/go-to';
import { Click } from '../../../model/action/html-element-action/click';
import { Refresh } from '../../../model/action/refresh';
import { BoundingBox } from '../../../model/bounding-box';
import { CssLocator } from '../../../model/locator/css-locator';
import { Method } from '../../../model/locator/locator';
import { XpathLocator } from '../../../model/locator/xpath-locator';
import { Project } from '../../../model/project';
import { Sequence } from '../../../model/sequence';
import { ImportService } from '../../../service/import.service';

let importService: ImportService;

beforeAll(() => {
  importService = new ImportService();
});

describe('ImportService', () => {
  describe('importFromChrecJson', () => {
    test('returns project with valid Refresh Action', async () => {
      expect.assertions(3);

      const action = new Refresh('foo');
      const sequence = new Sequence('Test Sequence', [action]);
      const project = new Project('Project With Refresh', [sequence], [])

      const imported: Project = await importService.importFromChrecJson('src/__tests__/integration/assets/project-with-refresh.json');

      expect(imported).toEqual(project);
      expect(imported.sequences[0]).toEqual(sequence);
      expect(imported.sequences[0].actions[0]).toEqual(action);
    });

    test('returns project with valid GoTo Action', async () => {
      expect.assertions(1);

      const project: Project = await importService.importFromChrecJson('src/__tests__/integration/assets/project-with-goto.json');

      expect(project.sequences[0].actions[0]).toEqual(new GoTo('foo', 'https://www.github.com'));
    });

    test('returns project with valid Click Action', async () => {
      expect.assertions(1);

      const project: Project = await importService.importFromChrecJson('src/__tests__/integration/assets/project-with-click.json');

      expect(project.sequences[0].actions[0]).toEqual(
        new Click(
          'foo',
          [
            new CssLocator(Method.CSS_SELECTOR_GENERATOR, 'foo'),
            new XpathLocator(Method.ROBULA_PLUS, 'foo')
          ],
          new BoundingBox(42, 42, 42, 42)));
    });

    test('returns valid Project with correctly typed objects', async () => {
      expect.assertions(1);

      const imported: Project = await importService.importFromChrecJson('src/__tests__/integration/assets/project-with-all-actions.json');

      expect(imported).toBeInstanceOf(Project);
    });
  });
});