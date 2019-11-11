import { Locator as SeleniumLocator, WebDriver, WebElement } from 'selenium-webdriver';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Action } from '../action';

export abstract class HtmlElementAction extends Action {
  public recommendedLocator!: Locator;

  constructor(image: string, public locators: Locator[], public boundingBox: BoundingBox) {
    super(image);
  }

  public addLocator(locator: Locator): void {
    this.locators.push(locator);
  }

  public async test(driver: WebDriver): Promise<void> {
    if (!this.recommendedLocator) {
      throw new Error(`Internal Error: No recommended Locator specified for Action ${this.constructor.name}.`);
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
