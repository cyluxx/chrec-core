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
    const project = new Project(parsedJson.name, sequences);
    project.id = parsedJson.id;
    return project;
  }

  public reviveSequence(parsedJson: any): Sequence {
    const actions: Action[] = [];
    for (const action of parsedJson.actions) {
      actions.push(this.reviveAction(action));
    }
    const sequence = new Sequence(parsedJson.name, actions);
    sequence.id = parsedJson.id;
    return sequence;
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
        const back = new Back(actionTestResults, parsedJson.image);
        back.id = parsedJson.id;
        return back;
      case 'Forward':
        const forward = new Forward(actionTestResults, parsedJson.image);
        forward.id = parsedJson.id;
        return forward;
      case 'GoTo':
        const goTo = new GoTo(actionTestResults, parsedJson.image, parsedJson.url);
        goTo.id = parsedJson.id;
        return goTo;
      case 'Refresh':
        const refresh = new Refresh(actionTestResults, parsedJson.image);
        refresh.id = parsedJson.id;
        return refresh;
    }
    const switchToDefaultContext = new SwitchToDefaultContext(actionTestResults, parsedJson.image);
    switchToDefaultContext.id = parsedJson.id;
    return switchToDefaultContext;
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
        const clear = new Clear(actionTestResults, parsedJson.image, locators, boundingBox);
        clear.id = parsedJson.id;
        return clear;
      case 'Click':
        const click = new Click(actionTestResults, parsedJson.image, locators, boundingBox);
        click.id = parsedJson.id;
        return click;
      case 'Read':
        const read = new Read(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.text);
        read.id = parsedJson.id;
        return read;
      case 'Select':
        const select = new Select(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.value);
        select.id = parsedJson.id;
        return select;
      case 'Submit':
        const submit = new Submit(actionTestResults, parsedJson.image, locators, boundingBox);
        submit.id = parsedJson.id;
        return submit;
      case 'SwitchToContext':
        const switchToContext = new SwitchToContext(actionTestResults, parsedJson.image, locators, boundingBox);
        switchToContext.id = parsedJson.id;
        return switchToContext;
      case 'Type':
        const type = new Type(actionTestResults, parsedJson.image, locators, boundingBox, parsedJson.value);
        type.id = parsedJson.id;
        return type;
      case 'WaitForAddedHtmlElement':
        const waitForAddedHtmlElement = new WaitForAddedHtmlElement(
          actionTestResults,
          parsedJson.image,
          locators,
          boundingBox,
          parsedJson.timeout,
        );
        waitForAddedHtmlElement.id = parsedJson.id;
        return waitForAddedHtmlElement;
      case 'WaitForRemovedHtmlElement':
        const waitForRemovedHtmlElement = new WaitForRemovedHtmlElement(
          actionTestResults,
          parsedJson.image,
          locators,
          boundingBox,
          parsedJson.timeout,
        );
        waitForRemovedHtmlElement.id = parsedJson.id;
        return waitForRemovedHtmlElement;
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
        const cssLocator = new CssLocator(locatorTestResults, parsedJson.method, parsedJson.value);
        cssLocator.id = parsedJson.id;
        return cssLocator;
      case 'XpathLocator':
        const xpathLocator = new XpathLocator(locatorTestResults, parsedJson.method, parsedJson.value);
        xpathLocator.id = parsedJson.id;
        return xpathLocator;
    }
    throw new Error('Could not revive Locator from JSON!');
  }

  public reviveLocatorTestResult(parsedJson: any): LocatorTestResult {
    const testResult = new LocatorTestResult(parsedJson.replayable);
    testResult.id = parsedJson.id;
    return testResult;
  }

  public reviveBrowserActionTestResult(parsedJson: any): BrowserActionTestResult {
    const testResult = new BrowserActionTestResult(this.reviveBrowser(parsedJson.browser), parsedJson.replayable);
    testResult.id = parsedJson.id;
    return testResult;
  }

  public reviveHtmlElementActionTestResult(parsedJson: any): HtmlElementActionTestResult {
    const testResult = new HtmlElementActionTestResult(this.reviveBrowser(parsedJson.browser));
    testResult.id = parsedJson.id;
    return testResult;
  }

  public reviveBrowser(parsedJson: any): Browser {
    switch (parsedJson.className) {
      case 'Chrome':
        const chrome = new Chrome(
          parsedJson.name,
          parsedJson.width,
          parsedJson.height,
          parsedJson.sleepMsBetweenActions,
        );
        chrome.id = parsedJson.id;
        return chrome;
      case 'Edge':
        const edge = new Edge(parsedJson.name, parsedJson.width, parsedJson.height, parsedJson.sleepMsBetweenActions);
        edge.id = parsedJson.id;
        return edge;
      case 'Firefox':
        const firefox = new Firefox(
          parsedJson.name,
          parsedJson.width,
          parsedJson.height,
          parsedJson.sleepMsBetweenActions,
        );
        firefox.id = parsedJson.id;
        return firefox;
      case 'InternetExplorer':
        const internetExplorer = new InternetExplorer(
          parsedJson.name,
          parsedJson.width,
          parsedJson.height,
          parsedJson.sleepMsBetweenActions,
        );
        internetExplorer.id = parsedJson.id;
        return internetExplorer;
    }
    throw new Error('Could not construct Browser from ChRec JSON!');
  }
}
