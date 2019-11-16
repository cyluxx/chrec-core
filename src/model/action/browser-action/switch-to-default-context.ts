import { WebDriver } from 'selenium-webdriver';
import { Action as AlexAction } from '../../../export/alex/action';
import { BrowserActionTestResult } from '../../action-test-result/browser-action-test-result';
import { BrowserAction } from '../browser-action';

export class SwitchToDefaultContext extends BrowserAction {
  constructor(testResults: BrowserActionTestResult[], image: string) {
    super(testResults, image);
  }

  public async testBrowserAction(driver: WebDriver): Promise<void> {
    await driver.switchTo().defaultContent();
  }
}
