import { WebDriver, WebElement } from 'selenium-webdriver';
import { HtmlElementActionTestResult } from '../../action-test-result/html-element-action-test-result';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator';
import { HtmlElementAction } from '../html-element-action';

export class Read extends HtmlElementAction {
  constructor(testResults: HtmlElementActionTestResult[], image: string, locators: Locator[], boundingBox: BoundingBox, public text: string) {
    super(testResults, image, locators, boundingBox);
  }

  public async testElement(driver: WebDriver, element: WebElement): Promise<void> {
    const text = await element.getText();
    if (!text.includes(this.text)) {
      throw new Error(`HTML Element does not contain the desired text: "${this.text}"`);
    }
  }
}
