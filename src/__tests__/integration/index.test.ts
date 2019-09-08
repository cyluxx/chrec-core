import { Core } from '../../index';
import { Click } from '../../model/action/html-element-action/click';
import { Refresh } from '../../model/action/refresh';
import { BoundingBox } from '../../model/bounding-box';
import { Chrome } from '../../model/browser/chrome';
import { Firefox } from '../../model/browser/firefox';
import { CssLocator } from '../../model/locator/css-locator';
import { XpathLocator } from '../../model/locator/xpath-locator';
import { Project } from '../../model/project';
import { Sequence } from '../../model/sequence';
import { Settings } from '../../model/settings';
import { ActionTestResult } from '../../model/test-result/action-test-result';
import { BrowserTestResult } from '../../model/test-result/browser-test-result';
import { HtmlElementActionTestResult } from '../../model/test-result/html-element-action-test-result';
import { LocatorTestResult } from '../../model/test-result/locator-test-result';
import { ProjectTestResult } from '../../model/test-result/project-test-result';
import { SequenceTestResult } from '../../model/test-result/sequence-test-result';

const SELENIUM_SERVER_URL: string = process.env.SELENIUM_SERVER_URL as string;
const SETTINGS: Settings = new Settings(SELENIUM_SERVER_URL, [new Chrome('foo', 800, 600, 0, false)]);

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
  expect(project.testResults[0]).toBeDefined();
  expect(project.testResults[0].sequenceTestResults[0]).toBeDefined();
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
  expect(project.testResults[0]).toBeDefined();
  expect(project.testResults[0].sequenceTestResults[0]).toBeDefined();
  expect(project.testResults[0].sequenceTestResults.length).toBe(1);
});

test('setRecommendedLocators', () => {
  const cssSelectorGenerator = new CssLocator('CssSelectorGenerator', 'foo');
  const finder = new CssLocator('Finder', 'foo');
  const getQuerySelector = new CssLocator('GetQuerySelector', 'foo');
  const optimalSelect = new CssLocator('OptimalSelect', 'foo');
  const selectorQuery = new CssLocator('SelectorQuery', 'foo');
  const robulaPlus = new XpathLocator('RobulaPlus', 'foo');

  const action = new Refresh('foo');
  const htmlElementAction = new Click(
    'foo',
    [cssSelectorGenerator, finder, getQuerySelector, optimalSelect, selectorQuery, robulaPlus],
    new BoundingBox(42, 42, 42, 42),
  );
  const sequence = new Sequence('foo', [action, htmlElementAction]);

  const browser = new Firefox('foo', 42, 42, 42);

  const csgTestResult = new LocatorTestResult(new Date(), cssSelectorGenerator, false);
  const fTestResult = new LocatorTestResult(new Date(), finder, false);
  const gqsTestResult = new LocatorTestResult(new Date(), getQuerySelector, false);
  const osTestResult = new LocatorTestResult(new Date(), optimalSelect, false);
  const sqTestResult = new LocatorTestResult(new Date(), selectorQuery, false);
  const rpTestResult = new LocatorTestResult(new Date(), robulaPlus, true);
  const actionTestResult = new ActionTestResult(new Date(), action, true);
  const htmlElementActionTestResult = new HtmlElementActionTestResult(new Date(), htmlElementAction, [
    csgTestResult,
    fTestResult,
    gqsTestResult,
    osTestResult,
    sqTestResult,
    rpTestResult,
  ]);
  const browserTestResult = new BrowserTestResult(new Date(), browser, [actionTestResult, htmlElementActionTestResult]);
  const sequenceTestResult = new SequenceTestResult(new Date(), sequence, [browserTestResult]);
  const projectTestResult = new ProjectTestResult(new Date(), [sequenceTestResult]);
  const project = new Project('foo', [sequence], [projectTestResult]);

  const core = new Core();

  core.setRecommendedLocators(project);

  expect(htmlElementActionTestResult.action.recommendedLocator).toEqual(
    new XpathLocator('RobulaPlus', 'foo'),
  );
});
