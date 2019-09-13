import * as compareVersions from 'compare-versions';
import loadJsonFile from 'load-json-file';
import { name as appName, version as appVersion } from '../../package.json';
import { Action } from '../model/action/action';
import { Back } from '../model/action/back';
import { Forward } from '../model/action/forward';
import { GoTo } from '../model/action/go-to';
import { Clear } from '../model/action/html-element-action/clear';
import { Click } from '../model/action/html-element-action/click';
import { HtmlElementAction } from '../model/action/html-element-action/html-element-action';
import { Read } from '../model/action/html-element-action/read';
import { Select } from '../model/action/html-element-action/select';
import { Submit } from '../model/action/html-element-action/submit';
import { SwitchToContext } from '../model/action/html-element-action/switch-to-context';
import { Type } from '../model/action/html-element-action/type';
import { WaitForAddedHtmlElement } from '../model/action/html-element-action/wait-for-added-html-element';
import { WaitForRemovedHtmlElement } from '../model/action/html-element-action/wait-for-removed-html-element';
import { Refresh } from '../model/action/refresh';
import { SwitchToDefaultContext } from '../model/action/switch-to-default-context';
import { BoundingBox } from '../model/bounding-box';
import { Browser } from '../model/browser/browser';
import { Chrome } from '../model/browser/chrome';
import { Edge } from '../model/browser/edge';
import { Firefox } from '../model/browser/firefox';
import { InternetExplorer } from '../model/browser/internet-explorer';
import { CssLocator } from '../model/locator/css-locator';
import { Locator } from '../model/locator/locator';
import { XpathLocator } from '../model/locator/xpath-locator';
import { Project } from '../model/project';
import { Sequence } from '../model/sequence';
import { ActionTestResult } from '../model/test-result/action-test-result';
import { BrowserTestResult } from '../model/test-result/browser-test-result';
import { HtmlElementActionTestResult } from '../model/test-result/html-element-action-test-result';
import { LocatorTestResult } from '../model/test-result/locator-test-result';
import { ProjectTestResult } from '../model/test-result/project-test-result';
import { SequenceTestResult } from '../model/test-result/sequence-test-result';

export class ImportService {

  public async importChrecJson(absolutePath: string): Promise<Project> {
    try {
      const parsedJson: any = await loadJsonFile(absolutePath);

      return this.validateChrecJson(parsedJson);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public validateChrecJson(parsedJson: any): Project {
    if (parsedJson.name !== appName) {
      throw new Error('Invalid ChRec JSON');
    }

    if (compareVersions.compare(parsedJson.version as string, appVersion as string, '>')) {
      throw new Error('Incompatible Versions. Please Upgrade your ChRec version!');
    }

    return this.reviveProject(parsedJson.project);
  }

  private reviveProject(parsedJson: any): Project {
    const sequences: Sequence[] = [];
    for (const sequence of parsedJson.sequences) {
      sequences.push(this.reviveSequence(sequence));
    }
    const projectTestResults: ProjectTestResult[] = [];
    for (const projectTestResult of parsedJson.projectTestResults) {
      projectTestResults.push(this.reviveProjectTestResult(projectTestResult));
    }
    return new Project(parsedJson.name, sequences, projectTestResults);
  }

  private reviveSequence(parsedJson: any): Sequence {
    const actions: Action[] = [];
    for (const action of parsedJson.actions) {
      actions.push(this.reviveAction(action));
    }
    return new Sequence(parsedJson.name, actions);
  }

  private reviveAction(parsedJson: any): Action {
    switch (parsedJson.className) {
      case 'Back':
        return new Back(parsedJson.image);
      case 'Forward':
        return new Forward(parsedJson.image);
      case 'GoTo':
        return new GoTo(parsedJson.image, parsedJson.url);
      case 'Refresh':
        return new Refresh(parsedJson.image);
      case 'SwitchToDefaultContext':
        return new SwitchToDefaultContext(parsedJson.image);
      default:
        return this.reviveHtmlElementAction(parsedJson);
    }
  }

  private reviveHtmlElementAction(parsedJson: any): HtmlElementAction {
    const locators: Locator[] = [];
    for (const locator of parsedJson.locators) {
      locators.push(this.reviveLocator(locator));
    }
    const boundingBox: BoundingBox = this.reviveBoundingBox(parsedJson.boundingBox);
    switch (parsedJson.className) {
      case 'Clear':
        return new Clear(parsedJson.image, locators, boundingBox);
      case 'Click':
        return new Click(parsedJson.image, locators, boundingBox);
      case 'Read':
        return new Read(parsedJson.image, locators, boundingBox, parsedJson.value);
      case 'Select':
        return new Select(parsedJson.image, locators, boundingBox, parsedJson.value);
      case 'Submit':
        return new Submit(parsedJson.image, locators, boundingBox);
      case 'SwitchToContext':
        return new SwitchToContext(parsedJson.image, locators, boundingBox);
      case 'Type':
        return new Type(parsedJson.image, locators, boundingBox, parsedJson.value, parsedJson.key);
      case 'WaitForAddedHtmlElement':
        return new WaitForAddedHtmlElement(parsedJson.image, locators, boundingBox, parsedJson.timeout);
      case 'WaitForRemovedHtmlElement':
        return new WaitForRemovedHtmlElement(parsedJson.image, locators, boundingBox, parsedJson.timeout);
      default:
        throw new Error(`Could not revive Action with className ${parsedJson.className} from JSON!`);
    }
  }

  private reviveLocator(parsedJson: any): Locator {
    switch (parsedJson.className) {
      case 'CssLocator':
        return new CssLocator(parsedJson.method, parsedJson.value);
      case 'XpathLocator':
        return new XpathLocator(parsedJson.method, parsedJson.value);
      default:
        throw new Error('Could not construct Locator from ChRec JSON!');
    }
  }

  private reviveBoundingBox(parsedJson: any): BoundingBox {
    return new BoundingBox(parsedJson.x, parsedJson.y, parsedJson.width, parsedJson.height);
  }

  private reviveBrowser(parsedJson: any): Browser {
    switch (parsedJson.className) {
      case 'Chrome':
        return new Chrome(parsedJson.name, parsedJson.width, parsedJson.height, parsedJson.sleepMsBetweenActions, parsedJson.headless);
      case 'Edge':
        return new Edge(parsedJson.name, parsedJson.width, parsedJson.height, parsedJson.sleepMsBetweenActions);
      case 'Firefox':
        return new Firefox(parsedJson.name, parsedJson.width, parsedJson.height, parsedJson.sleepMsBetweenActions);
      case 'InternetExplorer':
        return new InternetExplorer(parsedJson.name, parsedJson.width, parsedJson.height, parsedJson.sleepMsBetweenActions);
      default:
        throw new Error('Could not construct Browser from ChRec JSON!');
    }
  }

  private reviveProjectTestResult(parsedJson: any): ProjectTestResult {
    const sequenceTestResults: SequenceTestResult[] = [];
    for (const sequenceTestResult of parsedJson.sequenceTestResults) {
      sequenceTestResults.push(this.reviveSequenceTestResult(sequenceTestResult));
    }
    return new ProjectTestResult(parsedJson.date, sequenceTestResults);
  }

  private reviveSequenceTestResult(parsedJson: any): SequenceTestResult {
    const sequence: Sequence = this.reviveSequence(parsedJson.sequence);
    const browserTestResults: BrowserTestResult[] = [];
    for (const browserTestResult of parsedJson.browserTestResults) {
      browserTestResults.push(this.reviveBrowserTestResult(browserTestResult));
    }
    return new SequenceTestResult(parsedJson.date, sequence, browserTestResults);
  }

  private reviveBrowserTestResult(parsedJson: any): BrowserTestResult {
    const browser: Browser = this.reviveBrowser(parsedJson.browser);
    const actionTestResults: ActionTestResult[] = [];
    for (const actionTestResult of parsedJson.actionTestResults) {
      actionTestResults.push(this.reviveActionTestResult(actionTestResult));
    }
    return new BrowserTestResult(parsedJson.date, browser, actionTestResults);
  }

  private reviveActionTestResult(parsedJson: any): ActionTestResult {
    if (parsedJson.locatorTestResults) {
      return this.reviveHtmlElementActionTestResult(parsedJson);
    }
    const action: Action = this.reviveAction(parsedJson.action);
    const valid: boolean = parsedJson.valid ? true : false;
    return new ActionTestResult(parsedJson.date, action, valid);
  }

  private reviveHtmlElementActionTestResult(parsedJson: any): HtmlElementActionTestResult {
    const action: HtmlElementAction = this.reviveAction(parsedJson.action) as HtmlElementAction;
    const locatorTestResults: LocatorTestResult[] = [];
    for (const locatorTestResult of parsedJson.locatorTestResults) {
      locatorTestResults.push(this.reviveLocatorTestResult(locatorTestResult));
    }
    return new HtmlElementActionTestResult(parsedJson.date, action, locatorTestResults);
  }

  private reviveLocatorTestResult(parsedJson: any): LocatorTestResult {
    const locator: Locator = this.reviveLocator(parsedJson.locator);
    return new LocatorTestResult(parsedJson.date, locator, parsedJson.valid);
  }
}
