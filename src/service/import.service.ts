import * as compareVersions from 'compare-versions';
import loadJsonFile from 'load-json-file';
import { Action } from '../model/action';
import { BrowserActionTestResult } from '../model/action-test-result/browser-action-test-result';
import { HtmlElementActionTestResult } from '../model/action-test-result/html-element-action-test-result';
import { BrowserAction } from '../model/action/browser-action';
import { Back } from '../model/action/browser-action/back';
import { Forward } from '../model/action/browser-action/forward';
import { GoTo } from '../model/action/browser-action/go-to';
import { Refresh } from '../model/action/browser-action/refresh';
import { SwitchToDefaultContext } from '../model/action/browser-action/switch-to-default-context';
import { HtmlElementAction } from '../model/action/html-element-action';
import { Clear } from '../model/action/html-element-action/clear';
import { Click } from '../model/action/html-element-action/click';
import { Read } from '../model/action/html-element-action/read';
import { Select } from '../model/action/html-element-action/select';
import { Submit } from '../model/action/html-element-action/submit';
import { SwitchToContext } from '../model/action/html-element-action/switch-to-context';
import { Type } from '../model/action/html-element-action/type';
import { WaitForAddedHtmlElement } from '../model/action/html-element-action/wait-for-added-html-element';
import { WaitForRemovedHtmlElement } from '../model/action/html-element-action/wait-for-removed-html-element';
import { BoundingBox } from '../model/bounding-box';
import { Browser } from '../model/browser';
import { Chrome } from '../model/browser/chrome';
import { Edge } from '../model/browser/edge';
import { Firefox } from '../model/browser/firefox';
import { InternetExplorer } from '../model/browser/internet-explorer';
import { Locator } from '../model/locator';
import { LocatorTestResult } from '../model/locator-test-result';
import { CssLocator } from '../model/locator/css-locator';
import { XpathLocator } from '../model/locator/xpath-locator';
import { Project } from '../model/project';
import { Sequence } from '../model/sequence';

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
    if (parsedJson.name !== 'ChRec') {
      throw new Error('Invalid ChRec JSON');
    }

    if (compareVersions.compare(parsedJson.version as string, process.env.npm_package_version as string, '>')) {
      throw new Error('Incompatible Versions. Please Upgrade your ChRec version!');
    }

    return this.reviveProject(parsedJson.project);
  }

  public reviveProject(parsedJson: any): Project {
    const sequences: Sequence[] = [];
    for (const sequence of parsedJson.sequences) {
      sequences.push(this.reviveSequence(sequence));
    }
    return new Project(parsedJson.name, sequences);
  }

  public reviveSequence(parsedJson: any): Sequence {
    const actions: Action[] = [];
    for (const action of parsedJson.actions) {
      actions.push(this.reviveAction(action));
    }
    return new Sequence(parsedJson.name, actions);
  }

  public reviveAction(parsedJson: any): Action {
    if (
      parsedJson.className === 'Back'
      || parsedJson.className === 'Forward'
      || parsedJson.className === 'GoTo'
      || parsedJson.className === 'Refresh'
      || parsedJson.className === 'SwitchToDefaultContext'
    ) {
      return this.reviveBrowserAction(parsedJson);
    }
    return this.reviveHtmlElementAction(parsedJson);
  }

  public reviveBrowserAction(parsedJson: any): BrowserAction {
    const actionTestResults: BrowserActionTestResult[] = []
    for (const actionTestResult of parsedJson.testResults) {
      actionTestResults.push(this.reviveBrowserActionTestResult(actionTestResult))
    }
    switch (parsedJson.className) {
      case 'Back':
        return new Back(actionTestResults, parsedJson.image);
      case 'Forward':
        return new Forward(actionTestResults, parsedJson.image);
      case 'GoTo':
        return new GoTo(actionTestResults, parsedJson.image, parsedJson.url);
      case 'Refresh':
        return new Refresh(actionTestResults, parsedJson.image);
      case 'SwitchToDefaultContext':
        return new SwitchToDefaultContext(actionTestResults, parsedJson.image);
      default:
        throw new Error(`Internal: Could not revive BrowserAction with className ${parsedJson.className} from JSON!`);
    }
  }

  public reviveHtmlElementAction(parsedJson: any): HtmlElementAction {
    const actionTestResults: HtmlElementActionTestResult[] = []
    for (const actionTestResult of parsedJson.testResults) {
      actionTestResults.push(this.reviveHtmlElementActionTestResult(actionTestResult))
    }
    const locators: Locator[] = [];
    for (const locator of parsedJson.locators) {
      locators.push(this.reviveLocator(locator));
    }
    const boundingBox: BoundingBox = this.reviveBoundingBox(parsedJson.boundingBox);
    switch (parsedJson.className) {
      case 'Clear':
        return new Clear(actionTestResults, parsedJson.image, locators, boundingBox);
      case 'Click':
        return new Click(actionTestResults, parsedJson.image, locators, boundingBox);
      case 'Read':
        return new Read(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.value);
      case 'Select':
        return new Select(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.value);
      case 'Submit':
        return new Submit(actionTestResults, parsedJson.image, locators, boundingBox);
      case 'SwitchToContext':
        return new SwitchToContext(actionTestResults, parsedJson.image, locators, boundingBox);
      case 'Type':
        return new Type(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.value);
      case 'WaitForAddedHtmlElement':
        return new WaitForAddedHtmlElement(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.timeout);
      case 'WaitForRemovedHtmlElement':
        return new WaitForRemovedHtmlElement(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.timeout);
      default:
        throw new Error(`Internal: Could not revive HtmlElementAction with className ${parsedJson.className} from JSON!`);
    }
  }

  public reviveBoundingBox(parsedJson: any): BoundingBox {
    return new BoundingBox(parsedJson.x, parsedJson.y, parsedJson.width, parsedJson.height);
  }

  public reviveLocator(parsedJson: any): Locator {
    const locatorTestResults: LocatorTestResult[] = []
    for (const locatorTestResult of parsedJson.testResults) {
      locatorTestResults.push(this.reviveLocatorTestResult(locatorTestResult))
    }
    switch (parsedJson.className) {
      case 'CssLocator':
        return new CssLocator(locatorTestResults, parsedJson.method, parsedJson.value);
      case 'XpathLocator':
        return new XpathLocator(locatorTestResults, parsedJson.method, parsedJson.value);
      default:
        throw new Error('Could not revive Locator from JSON!');
    }
  }

  public reviveLocatorTestResult(parsedJson: any): LocatorTestResult {
    return new LocatorTestResult(parsedJson.replayable);
  }

  public reviveBrowserActionTestResult(parsedJson: any): BrowserActionTestResult {
    return new BrowserActionTestResult(this.reviveBrowser(parsedJson.browser), parsedJson.replayable);
  }

  public reviveHtmlElementActionTestResult(parsedJson: any): HtmlElementActionTestResult {
    return new HtmlElementActionTestResult(this.reviveBrowser(parsedJson.browser));
  }

  public reviveBrowser(parsedJson: any): Browser {
    switch (parsedJson.className) {
      case 'Chrome':
        return new Chrome(
          parsedJson.name,
          parsedJson.width,
          parsedJson.height,
          parsedJson.sleepMsBetweenActions,
          parsedJson.headless,
        );
      case 'Edge':
        return new Edge(parsedJson.name, parsedJson.width, parsedJson.height, parsedJson.sleepMsBetweenActions);
      case 'Firefox':
        return new Firefox(parsedJson.name, parsedJson.width, parsedJson.height, parsedJson.sleepMsBetweenActions);
      case 'InternetExplorer':
        return new InternetExplorer(
          parsedJson.name,
          parsedJson.width,
          parsedJson.height,
          parsedJson.sleepMsBetweenActions,
        );
      default:
        throw new Error('Could not construct Browser from ChRec JSON!');
    }
  }
}
