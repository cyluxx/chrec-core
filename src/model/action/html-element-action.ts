import { WebDriver, WebElement } from 'selenium-webdriver';
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

  public recommendedLocator(): Locator | null {
    const locatorCounts: LocatorCount[] = [];
    for (const locator of this.locators) {
      const count: number = locator.replayableTestResultCount()
      locatorCounts.push({ locator, count });
    }
    // sort desc
    locatorCounts.sort((a, b) => b.count - a.count);
    for (const locatorCount of locatorCounts) {
      if (locatorCount.locator.replayable) {
        return locatorCount.locator;
      }
    }
    return null;
  }

  public async test(browser: Browser, driver: WebDriver) {
    for (const locator of this.locators) {
      await locator.test(driver);
    }
    const recommendedLocator = this.recommendedLocator();
    if (recommendedLocator) {
      const element: WebElement = await recommendedLocator.findElement(driver);
      await this.testElement(driver, element);
    } else {
      throw new Error(`No recommended Locator found for Action ${this.constructor.name}`);
    }
  }

  protected abstract async testElement(driver: WebDriver, element: WebElement): Promise<void>;
}

interface LocatorCount {
  locator: Locator;
  count: number;
}
