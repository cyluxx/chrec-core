import { Core } from '../index';
import { Click } from '../model/action/html-element-action/click';
import { Refresh } from '../model/action/refresh';
import { BoundingBox } from '../model/bounding-box';
import { Chrome } from '../model/browser/chrome';
import { CssLocator } from '../model/locator/css-locator';
import { ActionTestResult } from '../model/test-result/action-test-result';
import { BrowserTestResult } from '../model/test-result/browser-test-result';
import { HtmlElementActionTestResult } from '../model/test-result/html-element-action-test-result';
import { LocatorTestResult } from '../model/test-result/locator-test-result';
import { ProjectTestResult } from '../model/test-result/project-test-result';
import { SequenceTestResult } from '../model/test-result/sequence-test-result';
import { Sequence } from '../model/sequence';
import { Project } from '../model/project';
import { Settings } from '../model/settings';

const SELENIUM_SERVER_URL: string = process.env.SELENIUM_SERVER_URL as string;
const SETTINGS: Settings = new Settings(SELENIUM_SERVER_URL, [new Chrome('foo', 800, 600, false)]);

test('addProjectTest', async () => {
  const core: Core = new Core();

  const locator: CssLocator = new CssLocator('foo', 'foo');
  const action: Refresh = new Refresh('foo');
  const htmlElementAction: Click = new Click('foo', [locator], new BoundingBox(42, 42, 42, 42));
  const sequence: Sequence = new Sequence('foo', [action, htmlElementAction], []);

  let project: Project = new Project('foo', [sequence], []);
  project = await core.addProjectTest(project, SETTINGS);

  expect.assertions(2);
  expect(project.getTestResults()[0]).toBeDefined();
  expect(project.getTestResults()[0].getSequenceTestResults()[0]).toBeDefined();
});

test('addSequenceTest', async () => {
  const core: Core = new Core();

  const locator: CssLocator = new CssLocator('foo', 'foo');
  const action: Refresh = new Refresh('foo');
  const htmlElementAction: Click = new Click('foo', [locator], new BoundingBox(42, 42, 42, 42));
  const browser: Chrome = new Chrome('foo', 800, 600, false);

  let sequence: Sequence = new Sequence('foo', [action, htmlElementAction], []);
  sequence = await core.addSequenceTest(sequence, SETTINGS);

  expect.assertions(1);
  expect(sequence.getTestResults()[0]).toBeDefined();
});
