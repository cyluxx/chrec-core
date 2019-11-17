import { WebDriver, WebElement } from 'selenium-webdriver';
import { HtmlElementActionTestResult } from '../../action-test-result/html-element-action-test-result';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator';
import { HtmlElementAction } from '../html-element-action';

export class Clear extends HtmlElementAction {
  constructor(
    testResults: HtmlElementActionTestResult[],
    image: string,
    locators: Locator[],
    boundingBox: BoundingBox,
  ) {
    super(testResults, image, locators, boundingBox);
  }

  public async testElement(driver: WebDriver, element: WebElement): Promise<void> {
    await element.clear();
  }
}
