import { Core } from '../index';
import { Click } from '../model/action/html-element-action/click';
import { Refresh } from '../model/action/refresh';
import { BoundingBox } from '../model/bounding-box';
import { Chrome } from '../model/browser/chrome';
import { CssLocator } from '../model/locator/css-locator';
import { Project } from '../model/project';
import { Sequence } from '../model/sequence';
import { Settings } from '../model/settings';

const SELENIUM_SERVER_URL: string = process.env.SELENIUM_SERVER_URL as string;
const SETTINGS: Settings = new Settings(SELENIUM_SERVER_URL, [new Chrome('foo', 800, 600, false)]);

test('addProjectTest', async () => {
  jest.setTimeout(10000);
  const core: Core = new Core();

  const locator: CssLocator = new CssLocator('foo', 'foo');
  const action: Refresh = new Refresh('foo');
  const htmlElementAction: Click = new Click('foo', [locator], new BoundingBox(42, 42, 42, 42));
  const sequence: Sequence = new Sequence('foo', [action, htmlElementAction]);

  let project: Project = new Project('foo', [sequence], []);
  project = await core.addProjectTest(project, SETTINGS);

  expect.assertions(2);
  expect(project.getTestResults()[0]).toBeDefined();
  expect(project.getTestResults()[0].getSequenceTestResults()[0]).toBeDefined();
});

test('addSequenceTest', async () => {
  jest.setTimeout(10000);
  const core: Core = new Core();

  const locator: CssLocator = new CssLocator('foo', 'foo');
  const action: Refresh = new Refresh('foo');
  const htmlElementAction: Click = new Click('foo', [locator], new BoundingBox(42, 42, 42, 42));
  const sequence: Sequence = new Sequence('foo', [action, htmlElementAction]);
  let project: Project = new Project('foo', [sequence, new Sequence('bar', [])], []);

  project = await core.addSequenceTest(project, sequence, SETTINGS);

  expect.assertions(3);
  expect(project.getTestResults()[0]).toBeDefined();
  expect(project.getTestResults()[0].getSequenceTestResults()[0]).toBeDefined();
  expect(project.getTestResults()[0].getSequenceTestResults().length).toBe(1);
});
