import { WebDriver, WebElement } from 'selenium-webdriver';
import { HtmlElementActionTestResult } from '../../action-test-result/html-element-action-test-result';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator';
import { HtmlElementAction } from '../html-element-action';

export class Type extends HtmlElementAction {
  constructor(
    testResults: HtmlElementActionTestResult[],
    image: string,
    locators: Locator[],
    boundingBox: BoundingBox,
    public value: string,
    id?: string,
  ) {
    super(testResults, image, locators, boundingBox, id);
  }

  public async testElement(driver: WebDriver, element: WebElement): Promise<void> {
    await element.sendKeys(this.value);
  }
}
