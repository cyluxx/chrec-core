import { WebDriver } from 'selenium-webdriver';
import { WebBrowser } from '../../../export/alex/action';
import { BrowserActionTestResult } from '../../action-test-result/browser-action-test-result';
import { BrowserAction } from '../browser-action';

export class Refresh extends BrowserAction {
  constructor(testResults: BrowserActionTestResult[], image: string) {
    super(testResults, image);
  }

  public async testBrowserAction(driver: WebDriver): Promise<void> {
    await driver.navigate().refresh();
  }
}
