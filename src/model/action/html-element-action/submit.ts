import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action, WebSubmit } from '../../../export/alex/action';
import { HtmlElementActionTestResult } from '../../action-test-result/html-element-action-test-result';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator';
import { HtmlElementAction } from '../html-element-action';

export class Submit extends HtmlElementAction {
  constructor(testResults: HtmlElementActionTestResult[], image: string, locators: Locator[], boundingBox: BoundingBox) {
    super(testResults, image, locators, boundingBox);
  }

  public async testElement(driver: WebDriver, element: WebElement): Promise<void> {
    await element.submit();
  }

  public toAlexActions(): Action[] {
    if (this.recommendedLocator) {
      return [new WebSubmit(this.recommendedLocator().toAlexNode())];
    }
    throw new Error(
      'No recommended locator specified, yet! Please run at least one test for this sequence before exporting it.',
    );
  }
}
