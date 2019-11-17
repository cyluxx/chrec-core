import { Locator as SeleniumLocator, until, WebDriver, WebElement } from 'selenium-webdriver';
import { HtmlElementActionTestResult } from '../../action-test-result/html-element-action-test-result';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator';
import { HtmlElementAction } from '../html-element-action';

export class WaitForAddedHtmlElement extends HtmlElementAction {
  constructor(
    testResults: HtmlElementActionTestResult[],
    image: string,
    locators: Locator[],
    boundingBox: BoundingBox,
    public timeout?: number,
  ) {
    super(testResults, image, locators, boundingBox);
  }

  public async testElement(driver: WebDriver, element: WebElement): Promise<void> {
    const seleniumLocator = this.getSeleniumLocator();
    if (seleniumLocator) {
      await driver.wait(until.elementLocated(seleniumLocator), this.timeout);
    } else {
      throw new Error(`${this.constructor.name}: No recommended Locator`);
    }
  }

  private getSeleniumLocator(): SeleniumLocator | null {
    const recommendedLocator = this.recommendedLocator();
    if (recommendedLocator) {
      return recommendedLocator.toSeleniumLocator();
    }
    return null;
  }
}
