import * as compareVersions from 'compare-versions';
import loadJsonFile from 'load-json-file';
import writeJsonFile from 'write-json-file';
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

export class ChrecJsonService {
  public async exportChrecJson(absolutePath: string, project: Project): Promise<void> {
    const json = { name: 'ChRec', version: process.env.npm_package_version, project };
    await writeJsonFile(absolutePath, json);
  }

  public async importChrecJson(absolutePath: string): Promise<Project> {
    const parsedJson: any = await loadJsonFile(absolutePath);
    return this.validateChrecJson(parsedJson);
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
    return new Project(parsedJson.name, sequences, parsedJson.id);
  }

  public reviveSequence(parsedJson: any): Sequence {
    const actions: Action[] = [];
    for (const action of parsedJson.actions) {
      actions.push(this.reviveAction(action));
    }
    return new Sequence(parsedJson.name, actions, parsedJson.id);
  }

  public reviveAction(parsedJson: any): Action {
    if (
      parsedJson.className === 'Back' ||
      parsedJson.className === 'Forward' ||
      parsedJson.className === 'GoTo' ||
      parsedJson.className === 'Refresh' ||
      parsedJson.className === 'SwitchToDefaultContext'
    ) {
      return this.reviveBrowserAction(parsedJson);
    }
    return this.reviveHtmlElementAction(parsedJson);
  }

  public reviveBrowserAction(parsedJson: any): BrowserAction {
    const actionTestResults: BrowserActionTestResult[] = [];
    for (const actionTestResult of parsedJson.testResults) {
      actionTestResults.push(this.reviveBrowserActionTestResult(actionTestResult));
    }
    switch (parsedJson.className) {
      case 'Back':
        return new Back(actionTestResults, parsedJson.image, parsedJson.id);
      case 'Forward':
        return new Forward(actionTestResults, parsedJson.image, parsedJson.id);
      case 'GoTo':
        return new GoTo(actionTestResults, parsedJson.image, parsedJson.url, parsedJson.id);
      case 'Refresh':
        return new Refresh(actionTestResults, parsedJson.image, parsedJson.id);
    }
    return new SwitchToDefaultContext(actionTestResults, parsedJson.image, parsedJson.id);
  }

  public reviveHtmlElementAction(parsedJson: any): HtmlElementAction {
    const actionTestResults: HtmlElementActionTestResult[] = [];
    for (const actionTestResult of parsedJson.testResults) {
      actionTestResults.push(this.reviveHtmlElementActionTestResult(actionTestResult));
    }
    const locators: Locator[] = [];
    for (const locator of parsedJson.locators) {
      locators.push(this.reviveLocator(locator));
    }
    const boundingBox: BoundingBox = this.reviveBoundingBox(parsedJson.boundingBox);
    switch (parsedJson.className) {
      case 'Clear':
        return new Clear(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.id);
      case 'Click':
        return new Click(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.id);
      case 'Read':
        return new Read(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.text, parsedJson.id);
      case 'Select':
        return new Select(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.value, parsedJson.id);
      case 'Submit':
        return new Submit(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.id);
      case 'SwitchToContext':
        return new SwitchToContext(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.id);
      case 'Type':
        return new Type(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.value, parsedJson.id);
      case 'WaitForAddedHtmlElement':
        return new WaitForAddedHtmlElement(
          actionTestResults,
          parsedJson.image,
          locators,
          boundingBox,
          parsedJson.timeout,
          parsedJson.id,
        );
      case 'WaitForRemovedHtmlElement':
        return new WaitForRemovedHtmlElement(
          actionTestResults,
          parsedJson.image,
          locators,
          boundingBox,
          parsedJson.timeout,
          parsedJson.id,
        );
    }
    throw new Error(`Internal: Could not revive HtmlElementAction with className ${parsedJson.className} from JSON!`);
  }

  public reviveBoundingBox(parsedJson: any): BoundingBox {
    return new BoundingBox(parsedJson.x, parsedJson.y, parsedJson.width, parsedJson.height);
  }

  public reviveLocator(parsedJson: any): Locator {
    const locatorTestResults: LocatorTestResult[] = [];
    for (const locatorTestResult of parsedJson.testResults) {
      locatorTestResults.push(this.reviveLocatorTestResult(locatorTestResult));
    }
    switch (parsedJson.className) {
      case 'CssLocator':
        return new CssLocator(locatorTestResults, parsedJson.method, parsedJson.value, parsedJson.id);
      case 'XpathLocator':
        return new XpathLocator(locatorTestResults, parsedJson.method, parsedJson.value, parsedJson.id);
    }
    throw new Error('Could not revive Locator from JSON!');
  }

  public reviveLocatorTestResult(parsedJson: any): LocatorTestResult {
    return new LocatorTestResult(parsedJson.replayable, parsedJson.id);
  }

  public reviveBrowserActionTestResult(parsedJson: any): BrowserActionTestResult {
    return new BrowserActionTestResult(this.reviveBrowser(parsedJson.browser), parsedJson.replayable, parsedJson.id);
  }

  public reviveHtmlElementActionTestResult(parsedJson: any): HtmlElementActionTestResult {
    return new HtmlElementActionTestResult(this.reviveBrowser(parsedJson.browser), parsedJson.id);
  }

  public reviveBrowser(parsedJson: any): Browser {
    switch (parsedJson.className) {
      case 'Chrome':
        return new Chrome(
          parsedJson.name,
          parsedJson.width,
          parsedJson.height,
          parsedJson.sleepMsBetweenActions,
          parsedJson.id,
        );
      case 'Edge':
        return new Edge(
          parsedJson.name,
          parsedJson.width,
          parsedJson.height,
          parsedJson.sleepMsBetweenActions,
          parsedJson.id,
        );
      case 'Firefox':
        return new Firefox(
          parsedJson.name,
          parsedJson.width,
          parsedJson.height,
          parsedJson.sleepMsBetweenActions,
          parsedJson.id,
        );
      case 'InternetExplorer':
        return new InternetExplorer(
          parsedJson.name,
          parsedJson.width,
          parsedJson.height,
          parsedJson.sleepMsBetweenActions,
          parsedJson.id,
        );
    }
    throw new Error('Could not construct Browser from ChRec JSON!');
  }
}
