import { WebDriver } from 'selenium-webdriver';
import { WebBrowser } from '../../../export/alex/action';
import { BrowserActionTestResult } from '../../action-test-result/browser-action-test-result';
import { BrowserAction } from '../browser-action';

export class Back extends BrowserAction {
  constructor(testResults: BrowserActionTestResult[], image: string) {
    super(testResults, image);
  }

  public async test(driver: WebDriver): Promise<void> {
    await driver.navigate().back();
  }

  public toAlexActions(): WebBrowser[] {
    throw new Error('Export Error: Alex does not support Back Action!');
  }
}
