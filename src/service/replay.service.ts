import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action } from '../model/action/action';
import { HtmlElementAction } from '../model/action/html-element-action/html-element-action';
import { Browser } from '../model/browser/browser';
import { Locator } from '../model/locator/locator';
import { Project } from '../model/project';
import { Sequence } from '../model/sequence';
import { Settings } from '../model/settings';
import { Code, Status } from '../model/status';
import { ActionTestResult } from '../model/test-result/action-test-result';
import { BrowserTestResult } from '../model/test-result/browser-test-result';
import { HtmlElementActionTestResult } from '../model/test-result/html-element-action-test-result';
import { LocatorTestResult } from '../model/test-result/locator-test-result';
import { ProjectTestResult } from '../model/test-result/project-test-result';
import { SequenceTestResult } from '../model/test-result/sequence-test-result';

export class ReplayService {
  public async testProject(project: Project, settings: Settings): Promise<ProjectTestResult> {
    const sequenceTestResults: SequenceTestResult[] = [];
    for (const sequence of project.getSequences()) {
      sequenceTestResults.push(await this.testSequence(sequence, settings));
    }
    return new ProjectTestResult(new Date(), project, sequenceTestResults);
  }

  public async testSequence(sequence: Sequence, settings: Settings): Promise<SequenceTestResult> {
    const browserTestResults: BrowserTestResult[] = [];
    for (const browser of settings.getBrowsers()) {
      browserTestResults.push(await this.testBrowser(browser, sequence.getActions(), settings));
    }
    return new SequenceTestResult(new Date(), sequence, browserTestResults);
  }

  public async testBrowser(browser: Browser, actions: Action[], settings: Settings): Promise<BrowserTestResult> {
    const actionTestResults: ActionTestResult[] = [];
    const driver: WebDriver = browser.buildWebDriver(settings.getSeleniumGridUrl());
    for (const action of actions) {
      actionTestResults.push(await this.testAction(action, driver));
    }
    driver.quit();
    return new BrowserTestResult(new Date(), browser, actionTestResults);
  }

  public async testAction(action: Action, driver: WebDriver): Promise<ActionTestResult> {
    if (action instanceof HtmlElementAction) {
      return this.testHtmlElementAction(action, driver);
    } else {
      const status: Status = await action.run(driver);
      return new ActionTestResult(new Date(), action, status.toBoolean());
    }
  }

  public async testHtmlElementAction(action: HtmlElementAction, driver: WebDriver) {
    const locatorTestResults: LocatorTestResult[] = [];
    for (const locator of action.getLocators()) {
      const testResult = await this.testLocator(locator, driver);
      locatorTestResults.push(testResult);
      if (testResult.isReplayable()) {
        action.setValidLocator(testResult.getLocator());
      }
    }
    await action.run(driver);
    return new HtmlElementActionTestResult(new Date(), action, locatorTestResults);
  }

  public async testLocator(locator: Locator, driver: WebDriver): Promise<LocatorTestResult> {
    let valid: boolean = false;
    if ((await locator.test(driver)).getCode() === Code.OK) {
      valid = true;
    }
    return new LocatorTestResult(new Date(), locator, valid);
  }
}
