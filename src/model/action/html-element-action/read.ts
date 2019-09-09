import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action, WebCheckForText } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { HtmlElementAction, HtmlElementActionJSON } from './html-element-action';

export interface ReadJSON extends HtmlElementActionJSON {
  value: string
}

export class Read extends HtmlElementAction {

  public static fromJSON(json: ReadJSON): Read {
    const action = Object.create(Read.prototype);
    return Object.assign(action, json);
  }

  constructor(image: string, locators: Locator[], boundingBox: BoundingBox, public value: string) {
    super(image, locators, boundingBox);
  }

  public async run(driver: WebDriver): Promise<Status> {
    let element: WebElement;
    if (!this.recommendedLocator) {
      return new Status(Code.RECOMMENDED_LOCATOR_NOT_SPECIFIED, `${this.constructor.name} Action: Recommended Locator not Specified!`);
    }
    try {
      element = await this.findElement(driver);
      const text = await element.getText();
      if (text.includes(this.value)) {
        return new Status(Code.OK, `${this.constructor.name} Action successful!`);
      }
      return new Status(Code.READ_VALUE_NOT_IN_TEXT, 'Html Element does not contain desired value.');
    } catch (error) {
      return this.getErrorStatus(error);
    }
  }

  public toAlexActions(): Action[] {
    if (this.recommendedLocator) {
      return [new WebCheckForText(this.value, this.recommendedLocator.toAlexNode())];
    }
    throw new Error(
      'No recommended locator specified, yet! Please run at least one test for this sequence before exporting it.',
    );
  }
}
