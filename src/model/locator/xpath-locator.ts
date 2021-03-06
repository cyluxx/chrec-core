import { By, Locator as SeleniumLocator } from 'selenium-webdriver';
import { Locator, Method } from '../locator';
import { LocatorTestResult } from '../locator-test-result';

export class XpathLocator extends Locator {
  constructor(testResults: LocatorTestResult[], method: Method, value: string, id?: string) {
    super(testResults, method, value, id);
  }

  public toSeleniumLocator(): SeleniumLocator {
    return By.xpath(this.value);
  }
}
