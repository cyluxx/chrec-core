import { WebDriver } from 'selenium-webdriver';
import { BrowserActionTestResult } from '../../action-test-result/browser-action-test-result';
import { BrowserAction } from '../browser-action';

export class SwitchToDefaultContext extends BrowserAction {
  constructor(testResults: BrowserActionTestResult[], image: string, id?: string) {
    super(testResults, image, id);
  }

  public async testBrowserAction(driver: WebDriver): Promise<void> {
    await driver.switchTo().defaultContent();
  }
}
