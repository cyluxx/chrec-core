import { WebDriver } from 'selenium-webdriver';
import { WebGoTo } from '../../../export/alex/action';
import { BrowserActionTestResult } from '../../action-test-result/browser-action-test-result';
import { BrowserAction } from '../browser-action';

export class GoTo extends BrowserAction {
  constructor(testResults: BrowserActionTestResult[], image: string, public url: string) {
    super(testResults, image);
  }

  public async test(driver: WebDriver): Promise<void> {
    await driver.navigate().to(this.url);
  }

  public toAlexActions(): WebGoTo[] {
    return [new WebGoTo(this.url)];
  }
}