import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action, WebCheckForText } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { HtmlElementAction, HtmlElementActionJSON } from './html-element-action';

export interface ReadJSON extends HtmlElementActionJSON {
  value: string;
}

export class Read extends HtmlElementAction {
  constructor(image: string, locators: Locator[], boundingBox: BoundingBox, public text: string) {
    super(image, locators, boundingBox);
  }

  public async testElement(driver: WebDriver, element: WebElement): Promise<void> {
    const text = await element.getText();
    if (!text.includes(this.text)) {
      throw new Error(`HTML Element does not contain the desired text: "${this.text}"`);
    }
  }

  public toAlexActions(): Action[] {
    if (this.recommendedLocator) {
      return [new WebCheckForText(this.text, this.recommendedLocator.toAlexNode())];
    }
    throw new Error(
      'No recommended locator specified, yet! Please run at least one test for this sequence before exporting it.',
    );
  }
}
