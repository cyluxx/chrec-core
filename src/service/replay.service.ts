import { WebDriver } from 'selenium-webdriver';
import { Action } from '../model/action';
import { ActionTestResult } from '../model/action-test-result';
import { BrowserTestResult } from '../model/action-test-result/browser-test-result';
import { HtmlElementActionTestResult } from '../model/action-test-result/html-element-action-test-result';
import { ProjectTestResult } from '../model/action-test-result/project-test-result';
import { SequenceTestResult } from '../model/action-test-result/sequence-test-result';
import { HtmlElementAction } from '../model/action/html-element-action';
import { Browser } from '../model/browser';
import { Locator } from '../model/locator';
import { LocatorTestResult } from '../model/locator-test-result';
import { Project } from '../model/project';
import { Sequence } from '../model/sequence';
import { Settings } from '../model/settings';

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
    return new SequenceTestResult(sequence, browserTestResults);
  }

  public async testBrowser(browser: Browser, actions: Action[], seleniumServerUrl: string): Promise<BrowserTestResult> {
    const actionTestResults: Array<ActionTestResult | HtmlElementActionTestResult> = [];
    const driver: WebDriver = browser.buildWebDriver(seleniumServerUrl);
    for (const action of actions) {
      if (browser.sleepMsBetweenActions) {
        await driver.sleep(browser.sleepMsBetweenActions);
      }
      actionTestResults.push(await this.testAction(action, driver));
    }
    driver.quit();
    return new BrowserTestResult(browser, actionTestResults);
  }

  public async testAction(action: Action, driver: WebDriver): Promise<ActionTestResult | HtmlElementActionTestResult> {
    if (action instanceof HtmlElementAction) {
      return this.testHtmlElementAction(action, driver);
    } else {
      try {
        await action.test(driver);
      }
      catch (error) {
        return new ActionTestResult(action, false);
      }
      return new ActionTestResult(action, true);
    }
  }

  public async testHtmlElementAction(action: HtmlElementAction, driver: WebDriver): Promise<HtmlElementActionTestResult> {
    const locatorTestResults: LocatorTestResult[] = [];
    for (const locator of action.locators) {
      const testResult = await this.testLocator(locator, driver);
      locatorTestResults.push(testResult);
    }
    await action.test(driver);
    return new HtmlElementActionTestResult(action, locatorTestResults);
  }

  public async testLocator(locator: Locator, driver: WebDriver): Promise<LocatorTestResult> {
    try {
      await locator.test(driver);
    }
    catch (error) {
      return new LocatorTestResult(locator, false);
    }
    return new LocatorTestResult(locator, true);
  }
}
