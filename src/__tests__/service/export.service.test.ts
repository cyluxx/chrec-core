import * as path from 'path';
import { WebClick, WebGoTo } from '../../export/alex/action';
import { AlexExport } from '../../export/alex/alex-export';
import { GoTo } from '../../model/action/go-to';
import { Click } from '../../model/action/html-element-action/click';
import { BoundingBox } from '../../model/bounding-box';
import { XpathLocator } from '../../model/locator/xpath-locator';
import { Project } from '../../model/project';
import { Sequence } from '../../model/sequence';
import { Code, Status } from '../../model/status';
import { ExportService } from '../../service/export.service';

const EXPORT_SERVICE: ExportService = new ExportService();

test('Project converts to proper AlexExport', () => {
  const locator: XpathLocator = new XpathLocator('foo', 'body');
  const htmlElementAction: Click = new Click('foo', [locator], new BoundingBox(42, 42, 42, 42));
  const action: GoTo = new GoTo('foo', 'https://github.com/cyluxx/chrec-core');
  htmlElementAction.setRecommendedLocator(locator);
  const sequence: Sequence = new Sequence('Sequence Name', [action, htmlElementAction]);
  const project: Project = new Project('Project Name', [sequence], []);

  const alexExport: AlexExport = EXPORT_SERVICE.convertToAlex(project);

  expect(alexExport.version).toEqual('1.6.1');
  expect(alexExport.type).toEqual('symbolGroups');
  expect(alexExport.symbolGroups[0].name).toEqual('Project Name (ChRec import)');
  expect(alexExport.symbolGroups[0].symbols[0].name).toEqual('Sequence Name');
  expect(alexExport.symbolGroups[0].symbols[0].steps[0].position).toBe(0);
  expect(alexExport.symbolGroups[0].symbols[0].steps[0].action.type).toEqual('web_goto');
  expect((alexExport.symbolGroups[0].symbols[0].steps[0].action as WebGoTo).url).toEqual(
    'https://github.com/cyluxx/chrec-core',
  );
  expect(alexExport.symbolGroups[0].symbols[0].steps[1].position).toBe(1);
  expect(alexExport.symbolGroups[0].symbols[0].steps[1].action.type).toEqual('web_click');
  expect((alexExport.symbolGroups[0].symbols[0].steps[1].action as WebClick).node.selector).toEqual('body');
  expect((alexExport.symbolGroups[0].symbols[0].steps[1].action as WebClick).node.type).toEqual('XPATH');
});

test('AlexExport is properly written to file', async () => {
  const locator: XpathLocator = new XpathLocator('foo', 'body');
  const htmlElementAction: Click = new Click('foo', [locator], new BoundingBox(42, 42, 42, 42));
  const action: GoTo = new GoTo('foo', 'https://github.com/cyluxx/chrec-core');
  htmlElementAction.setRecommendedLocator(locator);
  const sequence: Sequence = new Sequence('Sequence Name', [action, htmlElementAction]);
  const project: Project = new Project('Project Name', [sequence], []);

  const status: Status = await EXPORT_SERVICE.exportToAlexJson(
    path.resolve(__dirname, '..', 'assets', 'alex-export.json'),
    project,
  );

  expect.assertions(1);
  expect(status.getCode()).toBe(Code.OK);
});
