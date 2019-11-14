import { Locator as SeleniumLocator, WebDriver, WebElement } from 'selenium-webdriver';
import { Action } from '../action';
import { HtmlElementActionTestResult } from '../action-test-result/html-element-action-test-result';
import { BoundingBox } from '../bounding-box';
import { Locator } from '../locator';
import { Browser } from '../browser';

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

  public async test(browser: Browser, driver: WebDriver) {
    for (const locator of this.locators) {
      await locator.test(driver);
    }
    try {
      const element: WebElement = await this.recommendedLocator.findElement(driver);
      await this.testElement(driver, element);
    } catch (error) {
      throw this.getError(error);
    }
  }

  protected getSeleniumLocator(): SeleniumLocator {
    return this.recommendedLocator.toSeleniumLocator();
  }

  protected abstract async testElement(driver: WebDriver, element: WebElement): Promise<void>;

  private getError(error: Error): Error {
    if (error.name === 'NoSuchElementError') {
      return new Error(`${this.recommendedLocator.constructor.name} ${this.recommendedLocator.method} not found!`);
    }
    return error;
  }
}
