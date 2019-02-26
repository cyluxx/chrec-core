import { Action } from '../model/action/action';
import { Back } from '../model/action/back';
import { Forward } from '../model/action/forward';
import { GoTo } from '../model/action/go-to';
import { Click } from '../model/action/html-element-action/click';
import { HtmlElementAction } from '../model/action/html-element-action/html-element-action';
import { Refresh } from '../model/action/refresh';
import { BoundingBox } from '../model/bounding-box';
import { Browser } from '../model/browser/browser';
import { Chrome } from '../model/browser/chrome';
import { Edge } from '../model/browser/edge';
import { Firefox } from '../model/browser/firefox';
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

export class ModelFactory {

    public projectFromChrecJson(parsedJson: any): Project {
        const sequences: Sequence[] = [];
        for (const sequence of parsedJson.sequences) {
            sequences.push(this.sequenceFromChrecJson(sequence));
        }
        const projectTestResults: ProjectTestResult[] = [];
        for (const projectTestResult of parsedJson.projectTestResults) {
            projectTestResults.push(this.projectTestResultFromChrecJson(projectTestResult));
        }
        return new Project(parsedJson.name, sequences, projectTestResults);
    }

    public sequenceFromChrecJson(parsedJson: any): Sequence {
        const actions: Action[] = [];
        for (const action of parsedJson.actions) {
            actions.push(this.actionFromChrecJson(action));
        }
        const sequenceTestResults: SequenceTestResult[] = [];
        for (const sequenceTestResult of parsedJson.sequenceTestResults) {
            sequenceTestResults.push(this.sequenceTestResultFromChrecJson(sequenceTestResult));
        }
        return new Sequence(parsedJson.name, actions, sequenceTestResults);
    }

    public actionFromChrecJson(parsedJson: any): Action {
        const locators: Locator[] = [];
        for (const locator of parsedJson.locators) {
            locators.push(this.locatorFromChrecJson(locator));
        }
        const boundingBox: BoundingBox = this.boundingBoxFromChrecJson(parsedJson.boundingBox);
        switch (parsedJson.className) {
            case 'Back':
                return new Back(parsedJson.image);
            case 'Forward':
                return new Forward(parsedJson.image);
            case 'GoTo':
                return new GoTo(parsedJson.image, parsedJson.url);
            case 'Refresh':
                return new Refresh(parsedJson.image);
            case 'Click':
                return new Click(parsedJson.image, locators, boundingBox);
            default:
                throw new Error('Could not construct Action from ChRec JSON!');
        }
    }

    public locatorFromChrecJson(parsedJson: any): Locator {
        switch (parsedJson.className) {
            case 'CssLocator':
                return new CssLocator(parsedJson.methodName, parsedJson.value);
            case 'XpathLocator':
                return new XpathLocator(parsedJson.methodName, parsedJson.value);
            default:
                throw new Error('Could not construct Locator from ChRec JSON!');
        }
    }

    public boundingBoxFromChrecJson(parsedJson: any): BoundingBox {
        return new BoundingBox(parsedJson.x, parsedJson.y, parsedJson.width, parsedJson.height);
    }

    public browserFromChrecJson(parsedJson: any): Browser {
        switch (parsedJson.className) {
            case 'Chrome':
                return new Chrome(parsedJson.name, parsedJson.width, parsedJson.height, parsedJson.headless);
            case 'Edge':
                return new Edge(parsedJson.name, parsedJson.width, parsedJson.height);
            case 'Firefox':
                return new Firefox(parsedJson.name, parsedJson.width, parsedJson.height);
            default:
                throw new Error('Could not construct Browser from ChRec JSON!');
        }
    }

    public projectTestResultFromChrecJson(parsedJson: any): ProjectTestResult {
        const sequenceTestResults: SequenceTestResult[] = [];
        for (const sequenceTestResult of parsedJson.sequenceTestResults) {
            sequenceTestResults.push(this.sequenceTestResultFromChrecJson(sequenceTestResult));
        }
        return new ProjectTestResult(parsedJson.date, sequenceTestResults);
    }

    public sequenceTestResultFromChrecJson(parsedJson: any): SequenceTestResult {
        const browserTestResults: BrowserTestResult[] = [];
        for (const browserTestResult of parsedJson.browserTestResults) {
            browserTestResults.push(this.browserTestResultFromChrecJson(browserTestResult));
        }
        return new SequenceTestResult(parsedJson.date, browserTestResults);
    }

    public browserTestResultFromChrecJson(parsedJson: any): BrowserTestResult {
        const browser: Browser = this.browserFromChrecJson(parsedJson.browser);
        const actionTestResults: ActionTestResult[] = [];
        for (const actionTestResult of parsedJson.actionTestResults) {
            actionTestResults.push(this.actionTestResultFromChrecJson(actionTestResult));
        }
        return new BrowserTestResult(parsedJson.date, browser, actionTestResults);
    }

    public actionTestResultFromChrecJson(parsedJson: any): ActionTestResult {
        if (parsedJson.locators) {
            return this.htmlElementActionTestResultFromChrecJson(parsedJson);
        }
        const action: Action = this.actionFromChrecJson(parsedJson.action);
        const valid: boolean = parsedJson.valid ? true : false;
        return new ActionTestResult(parsedJson.date, action, valid);
    }

    public htmlElementActionTestResultFromChrecJson(parsedJson: any): HtmlElementActionTestResult {
        const action: HtmlElementAction = this.actionFromChrecJson(parsedJson.action) as HtmlElementAction;
        const locatorTestResults: LocatorTestResult[] = [];
        for (const locatorTestResult of parsedJson.locatorTestResults) {
            locatorTestResults.push(this.locatorTestResultFromChrecJson(locatorTestResult));
        }
        return new HtmlElementActionTestResult(parsedJson.date, action, locatorTestResults);
    }

    public locatorTestResultFromChrecJson(parsedJson: any): LocatorTestResult {
        const locator: Locator = this.locatorFromChrecJson(parsedJson.locator);
        return new LocatorTestResult(parsedJson.date, locator, parsedJson.valid);
    }
}