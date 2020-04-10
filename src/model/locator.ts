import { Locator as SeleniumLocator, WebDriver, WebElement } from 'selenium-webdriver';
import { Identificable } from './identififable';
import { LocatorTestResult } from './locator-test-result';

export enum Method {
  CSS_SELECTOR_GENERATOR = 'CssSelectorGenerator',
  FINDER = 'Finder',
  GET_QUERY_SELECTOR = 'GetQuerySelector',
  OPTIMAL_SELECT = 'OptimalSelect',
  SELECTOR_QUERY = 'SelectorQuery',
  ROBULA_PLUS = 'RobulaPlus',
}

export abstract class Locator extends Identificable {
  constructor(public testResults: LocatorTestResult[], public method: Method, public value: string, id?: string) {
    super(id);
  }

  get replayable(): boolean {
    if (this.testResults.length > 0) {
      return this.testResults[0].replayable;
    }
    return false;
  }

  public toJSON(): object {
    return Object.assign({ className: this.constructor.name }, this);
  }

  public addTestResult(testResult: LocatorTestResult) {
    this.testResults.push(testResult);
  }

  public replayableTestResultCount(): number {
    let count = 0;
    for (const testResult of this.testResults) {
      if (testResult.replayable) {
        count++;
      }
    }
    return count;
  }

  public async test(driver: WebDriver) {
    try {
      await this.findElement(driver);
      this.addTestResult(new LocatorTestResult(true));
    } catch (error) {
      this.addTestResult(new LocatorTestResult(false));
    }
  }

  public async findElement(driver: WebDriver): Promise<WebElement> {
    return driver.findElement(this.toSeleniumLocator());
  }

  public abstract toSeleniumLocator(): SeleniumLocator;
}
