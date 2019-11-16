import { Locator as SeleniumLocator, WebDriver, WebElement } from 'selenium-webdriver';
import { Node } from '../export/alex/node';
import { LocatorTestResult } from './locator-test-result';

export enum Method {
  CSS_SELECTOR_GENERATOR = 'CssSelectorGenerator',
  FINDER = 'Finder',
  GET_QUERY_SELECTOR = 'GetQuerySelector',
  OPTIMAL_SELECT = 'OptimalSelect',
  SELECTOR_QUERY = 'SelectorQuery',
  ROBULA_PLUS = 'RobulaPlus',
}

export abstract class Locator {
  constructor(public testResults: LocatorTestResult[], public method: Method, public value: string) { }

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
    }
    catch (error) {
      this.addTestResult(new LocatorTestResult(false));
    }
  }

  public abstract toSeleniumLocator(): SeleniumLocator;

  public abstract async findElement(driver: WebDriver): Promise<WebElement>;

  public abstract toAlexNode(): Node;
}
