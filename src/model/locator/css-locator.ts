import { By, Locator as SeleniumLocator, WebDriver, WebElement } from 'selenium-webdriver';
import { Node, NodeType } from '../../export/alex/node';
import { Locator, Method } from '../locator';
import { LocatorTestResult } from '../locator-test-result';

export class CssLocator extends Locator {
  constructor(testResults: LocatorTestResult[], method: Method, value: string) {
    super(testResults, method, value);
  }

  public async findElement(driver: WebDriver): Promise<WebElement> {
    return await driver.findElement(this.toSeleniumLocator());
  }

  public toSeleniumLocator(): SeleniumLocator {
    return By.css(this.value);
  }
}
