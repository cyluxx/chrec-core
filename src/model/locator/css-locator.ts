import { By, Locator as SeleniumLocator } from 'selenium-webdriver';
import { Locator, Method } from '../locator';
import { LocatorTestResult } from '../locator-test-result';

export class CssLocator extends Locator {
  constructor(testResults: LocatorTestResult[], method: Method, value: string) {
    super(testResults, method, value);
  }

  public toSeleniumLocator(): SeleniumLocator {
    return By.css(this.value);
  }
}
