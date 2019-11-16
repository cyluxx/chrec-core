import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action, WebSelect } from '../../../export/alex/action';
import { HtmlElementActionTestResult } from '../../action-test-result/html-element-action-test-result';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator';
import { HtmlElementAction } from '../html-element-action';

export class Select extends HtmlElementAction {
  constructor(testResults: HtmlElementActionTestResult[], image: string, locators: Locator[], boundingBox: BoundingBox, public value: string) {
    super(testResults, image, locators, boundingBox);
  }

  public async testElement(driver: WebDriver, element: WebElement): Promise<void> {
    await element.sendKeys(this.value);
  }
}
