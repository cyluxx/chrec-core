import { until, WebDriver, WebElement } from 'selenium-webdriver';
import { Action } from '../../../export/alex/action';
import { HtmlElementActionTestResult } from '../../action-test-result/html-element-action-test-result';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator';
import { HtmlElementAction } from '../html-element-action';

export class WaitForRemovedHtmlElement extends HtmlElementAction {
  constructor(testResults: HtmlElementActionTestResult[], image: string, locators: Locator[], boundingBox: BoundingBox, public timeout?: number) {
    super(testResults, image, locators, boundingBox);
  }

  public async testElement(driver: WebDriver, element: WebElement): Promise<void> {
    await driver.wait(until.stalenessOf(element), this.timeout);
  }
}
