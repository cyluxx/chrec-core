import { WebDriver } from 'selenium-webdriver';
import { Action } from '../action';
import { BrowserActionTestResult } from '../action-test-result/browser-action-test-result';
import { Browser } from '../browser';

export abstract class BrowserAction extends Action {
  constructor(testResults: BrowserActionTestResult[], image: string) {
    super(testResults, image);
  }

  public addTestResult(testResult: BrowserActionTestResult) {
    this.testResults.push(testResult);
  }

  public async test(browser: Browser, driver: WebDriver) {
    let replayable = false;
    try {
      await this.testBrowserAction(driver);
      replayable = true;
    }
    catch (error) {
      throw new Error(`Could not replay ${this.constructor.name} in Browser ${browser.name}!`);
    }
    finally {
      this.addTestResult(new BrowserActionTestResult(browser, replayable))
    }
  }

  protected abstract async testBrowserAction(driver: WebDriver): Promise<void>;
}
