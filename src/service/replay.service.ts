import { WebDriver } from 'selenium-webdriver';
import { Action } from '../model/action/action';
import { HtmlElementAction } from '../model/action/html-element-action/html-element-action';
import { Browser } from '../model/browser/browser';
import { Locator } from '../model/locator/locator';
import { Project } from '../model/project';
import { Sequence } from '../model/sequence';
import { Settings } from '../model/settings';
import { Status } from '../model/status';
import { ActionTestResult } from '../model/test-result/action-test-result';
import { BrowserTestResult } from '../model/test-result/browser-test-result';
import { HtmlElementActionTestResult } from '../model/test-result/html-element-action-test-result';
import { LocatorTestResult } from '../model/test-result/locator-test-result';
import { ProjectTestResult } from '../model/test-result/project-test-result';
import { SequenceTestResult } from '../model/test-result/sequence-test-result';

export class ReplayService {
  public async testProject(project: Project, settings: Settings): Promise<ProjectTestResult> {
    const sequenceTestResults: SequenceTestResult[] = [];
    for (const sequence of project.sequences) {
      sequenceTestResults.push(await this.testSequence(sequence, settings));
    }
    return new ProjectTestResult(new Date(), sequenceTestResults);
  }

  public async testSequence(sequence: Sequence, settings: Settings): Promise<SequenceTestResult> {
    const browserTestResults: BrowserTestResult[] = [];
    for (const browser of settings.browsers) {
      browserTestResults.push(await this.testBrowser(browser, sequence.actions, settings.seleniumServerUrl));
    }
    return new SequenceTestResult(new Date(), sequence, browserTestResults);
  }

  public async testBrowser(browser: Browser, actions: Action[], seleniumServerUrl: string): Promise<BrowserTestResult> {
    const actionTestResults: ActionTestResult[] = [];
    const driver: WebDriver = browser.buildWebDriver(seleniumServerUrl);
    for (const action of actions) {
      if (browser.sleepMsBetweenActions) {
        await driver.sleep(browser.sleepMsBetweenActions);
      }
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
      return new ActionTestResult(new Date(), action, status.isOk());
    }
  }

  public async testHtmlElementAction(
    action: HtmlElementAction,
    driver: WebDriver,
  ): Promise<HtmlElementActionTestResult> {
    const locatorTestResults: LocatorTestResult[] = [];
    for (const locator of action.locators) {
      const testResult = await this.testLocator(locator, driver);
      locatorTestResults.push(testResult);
    }
    await action.run(driver);
    return new HtmlElementActionTestResult(new Date(), action, locatorTestResults);
  }

  public async testLocator(locator: Locator, driver: WebDriver): Promise<LocatorTestResult> {
    const valid: boolean = (await locator.test(driver)).isOk();
    return new LocatorTestResult(new Date(), locator, valid);
  }
}
