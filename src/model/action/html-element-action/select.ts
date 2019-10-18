import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action, WebSelect } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { HtmlElementAction, HtmlElementActionJSON } from './html-element-action';

export interface SelectJSON extends HtmlElementActionJSON {
  value: string;
}

export class Select extends HtmlElementAction {
  constructor(image: string, locators: Locator[], boundingBox: BoundingBox, public value: string) {
    super(image, locators, boundingBox);
  }

  public async testElement(driver: WebDriver, element: WebElement): Promise<void> {
    await element.sendKeys(this.value);
  }

  public toAlexActions(): Action[] {
    if (this.recommendedLocator) {
      return [new WebSelect(this.value, this.recommendedLocator.toAlexNode())];
    }
    throw new Error(
      'No recommended locator specified, yet! Please run at least one test for this sequence before exporting it.',
    );
  }
}
