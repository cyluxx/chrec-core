import { WebDriver } from "selenium-webdriver";
import { Action } from "../../model/action/action";
import { Click } from "../../model/action/html-element-action/click";
import { HtmlElementAction } from '../../model/action/html-element-action/html-element-action';
import { Refresh } from "../../model/action/refresh";
import { BoundingBox } from "../../model/bounding-box";
import { Browser } from '../../model/browser/browser';
import { Edge } from '../../model/browser/edge';
import { Firefox } from "../../model/browser/firefox";
import { CssLocator } from "../../model/locator/css-locator";
import { Locator } from "../../model/locator/locator";
import { Project } from '../../model/project';
import { Sequence } from "../../model/sequence";
import { Settings } from "../../model/settings";
import { Status } from '../../model/status';
import { ActionTestResult } from "../../model/test-result/action-test-result";
import { BrowserTestResult } from "../../model/test-result/browser-test-result";
import { HtmlElementActionTestResult } from "../../model/test-result/html-element-action-test-result";
import { LocatorTestResult } from "../../model/test-result/locator-test-result";
import { ProjectTestResult } from '../../model/test-result/project-test-result';
import { SequenceTestResult } from "../../model/test-result/sequence-test-result";
import { ReplayService } from '../../service/replay.service';

test('is replayable', () => {
  const locator: CssLocator = new CssLocator('foo', 'foo');
  const action: Refresh = new Refresh('foo');
  const htmlElementAction: Click = new Click('foo', [locator], new BoundingBox(42, 42, 42, 42));
  const sequence: Sequence = new Sequence('foo', [action, htmlElementAction])
  const project: Project = new Project('foo', [sequence]);
  const browser: Edge = new Edge('foo', 42, 42);

  const locatorTestResult: LocatorTestResult = new LocatorTestResult(new Date(), locator, false);
  const actionTestResult: ActionTestResult = new ActionTestResult(new Date(), action);
  const htmlElementActionTestResult: HtmlElementActionTestResult = new HtmlElementActionTestResult(new Date(), htmlElementAction, [locatorTestResult]);
  const browserTestResult: BrowserTestResult = new BrowserTestResult(new Date(), browser, [actionTestResult, htmlElementActionTestResult]);
  const sequenceTestResult: SequenceTestResult = new SequenceTestResult(new Date(), sequence, [browserTestResult]);
  const projectTestResult: ProjectTestResult = new ProjectTestResult(new Date(), project , [sequenceTestResult]);

  expect(locatorTestResult.isReplayable()).toBe(false);
  expect(actionTestResult.isReplayable()).toBe(false);
  expect(htmlElementActionTestResult.isReplayable()).toBe(false);
  expect(browserTestResult.isReplayable()).toBe(false);
  expect(sequenceTestResult.isReplayable()).toBe(false);
  expect(projectTestResult.isReplayable()).toBe(false);
});

test('getSuccessfullLocatorCount', () => {
  const locator: CssLocator = new CssLocator('foo', 'foo');
  const action: Refresh = new Refresh('foo');
  const htmlElementAction: Click = new Click('foo', [locator], new BoundingBox(42, 42, 42, 42));
  const sequence: Sequence = new Sequence('foo', [action, htmlElementAction])
  const project: Project = new Project('foo', [sequence]);
  const browser: Edge = new Edge('foo', 42, 42);

  const locatorTestResult: LocatorTestResult = new LocatorTestResult(new Date(), locator, false);
  const actionTestResult: ActionTestResult = new ActionTestResult(new Date(), action);
  const htmlElementActionTestResult: HtmlElementActionTestResult = new HtmlElementActionTestResult(new Date(), htmlElementAction, [locatorTestResult]);
  const browserTestResult: BrowserTestResult = new BrowserTestResult(new Date(), browser, [actionTestResult, htmlElementActionTestResult]);
  const sequenceTestResult: SequenceTestResult = new SequenceTestResult(new Date(), sequence, [browserTestResult]);
  const projectTestResult: ProjectTestResult = new ProjectTestResult(new Date(), project , [sequenceTestResult]);

  expect(locatorTestResult.getSuccessfulLocatorCount()).toBe(0);
  expect(actionTestResult.getSuccessfulLocatorCount()).toBe(0);
  expect(htmlElementActionTestResult.getSuccessfulLocatorCount()).toBe(0);
  expect(browserTestResult.getSuccessfulLocatorCount()).toBe(0);
  expect(sequenceTestResult.getSuccessfulLocatorCount()).toBe(0);
  expect(projectTestResult.getSuccessfulLocatorCount()).toBe(0);
});

test('getTotalLocatorCount', () => {
  const locator: CssLocator = new CssLocator('foo', 'foo');
  const action: Refresh = new Refresh('foo');
  const htmlElementAction: Click = new Click('foo', [locator], new BoundingBox(42, 42, 42, 42));
  const sequence: Sequence = new Sequence('foo', [action, htmlElementAction])
  const project: Project = new Project('foo', [sequence]);
  const browser: Edge = new Edge('foo', 42, 42);

  const locatorTestResult: LocatorTestResult = new LocatorTestResult(new Date(), locator, false);
  const actionTestResult: ActionTestResult = new ActionTestResult(new Date(), action);
  const htmlElementActionTestResult: HtmlElementActionTestResult = new HtmlElementActionTestResult(new Date(), htmlElementAction, [locatorTestResult]);
  const browserTestResult: BrowserTestResult = new BrowserTestResult(new Date(), browser, [actionTestResult, htmlElementActionTestResult]);
  const sequenceTestResult: SequenceTestResult = new SequenceTestResult(new Date(), sequence, [browserTestResult]);
  const projectTestResult: ProjectTestResult = new ProjectTestResult(new Date(), project , [sequenceTestResult]);
  
  expect(locatorTestResult.getTotalLocatorCount()).toBe(1);
  expect(actionTestResult.getTotalLocatorCount()).toBe(0);
  expect(htmlElementActionTestResult.getTotalLocatorCount()).toBe(1);
  expect(browserTestResult.getTotalLocatorCount()).toBe(1);
  expect(sequenceTestResult.getTotalLocatorCount()).toBe(1);
  expect(projectTestResult.getTotalLocatorCount()).toBe(1);
});