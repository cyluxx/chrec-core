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
    try {
      await this.testBrowserAction(driver);
      this.addTestResult(new BrowserActionTestResult(browser, true));
    } catch (error) {
      this.addTestResult(new BrowserActionTestResult(browser, false));
    }
  }

  protected abstract async testBrowserAction(driver: WebDriver): Promise<void>;
}
