import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action, WebClick } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { HtmlElementAction } from './html-element-action';

export class Click extends HtmlElementAction {
  constructor(image: string, locators: Locator[], boundingBox: BoundingBox) {
    super(image, locators, boundingBox);
  }

  public async testElement(driver: WebDriver, element: WebElement): Promise<void> {
    await element.click();
  }

  public toAlexActions(): Action[] {
    if (this.recommendedLocator) {
      return [new WebClick(this.recommendedLocator.toAlexNode())];
    }
    throw new Error(
      'No recommended locator specified, yet! Please run at least one test for this sequence before exporting it.',
    );
  }
}
