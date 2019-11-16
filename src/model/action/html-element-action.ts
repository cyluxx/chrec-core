import { Locator as SeleniumLocator, WebDriver, WebElement } from 'selenium-webdriver';
import { Action } from '../action';
import { HtmlElementActionTestResult } from '../action-test-result/html-element-action-test-result';
import { BoundingBox } from '../bounding-box';
import { Browser } from '../browser';
import { Locator } from '../locator';

export abstract class HtmlElementAction extends Action {

  constructor(testResults: HtmlElementActionTestResult[], image: string, public locators: Locator[], public boundingBox: BoundingBox) {
    super(testResults, image);
  }

  public addTestResult(testResult: HtmlElementActionTestResult) {
    this.testResults.push(testResult);
  }

  public addLocator(locator: Locator): void {
    this.locators.push(locator);
  }

  public recommendedLocator(): Locator {
    const locatorCounts: LocatorCount[] = [];
    for (const locator of this.locators) {
      locatorCounts.push({
        locator,
        count: locator.replayableTestResultCount()
      });
    }
    // sort desc
    locatorCounts.sort((a, b) => b.count - a.count);
    for (const locatorCount of locatorCounts) {
      if (locatorCount.locator.replayable) {
        return locatorCount.locator;
      }
    }
    throw new Error(`All locators failed for Action ${this.constructor.name}`);
  }

  public async test(browser: Browser, driver: WebDriver) {
    for (const locator of this.locators) {
      await locator.test(driver);
    }
    try {
      const element: WebElement = await this.recommendedLocator().findElement(driver);
      await this.testElement(driver, element);
    } catch (error) {
      throw this.getError(error);
    }
  }

  protected getSeleniumLocator(): SeleniumLocator {
    return this.recommendedLocator().toSeleniumLocator();
  }

  protected abstract async testElement(driver: WebDriver, element: WebElement): Promise<void>;

  private getError(error: Error): Error {
    if (error.name === 'NoSuchElementError') {
      return new Error(`${this.recommendedLocator().constructor.name} ${this.recommendedLocator().method} not found!`);
    }
    return error;
  }
}

interface LocatorCount {
  locator: Locator;
  count: number;
}
