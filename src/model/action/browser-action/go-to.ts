import { WebDriver } from 'selenium-webdriver';
import { BrowserActionTestResult } from '../../action-test-result/browser-action-test-result';
import { BrowserAction } from '../browser-action';

export class GoTo extends BrowserAction {
  constructor(testResults: BrowserActionTestResult[], image: string, public url: string) {
    super(testResults, image);
  }

  public async testBrowserAction(driver: WebDriver): Promise<void> {
    await driver.navigate().to(this.url);
  }
}
