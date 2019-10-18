import { until, WebDriver, WebElement } from 'selenium-webdriver';
import { Action } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { HtmlElementAction } from './html-element-action';

export class WaitForRemovedHtmlElement extends HtmlElementAction {
  constructor(image: string, locators: Locator[], boundingBox: BoundingBox, public timeout?: number) {
    super(image, locators, boundingBox);
  }

  public async testElement(driver: WebDriver, element: WebElement): Promise<void> {
    await driver.wait(until.stalenessOf(element), this.timeout);
  }

  public toAlexActions(): Action[] {
    throw new Error('Not implemented yet');
  }
}
