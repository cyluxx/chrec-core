import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action, WebClear } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { HtmlElementAction, HtmlElementActionJSON } from './html-element-action';

export class Clear extends HtmlElementAction {

  public static fromJSON(json: HtmlElementActionJSON): Clear {
    const action = Object.create(Clear.prototype);
    return Object.assign(action, json);
  }

  constructor(image: string, locators: Locator[], boundingBox: BoundingBox) {
    super(image, locators, boundingBox);
  }

  public async run(driver: WebDriver): Promise<Status> {
    let element: WebElement;
    if (!this.recommendedLocator) {
      return new Status(Code.RECOMMENDED_LOCATOR_NOT_SPECIFIED, `${this.constructor.name} Action: Recommended Locator not Specified!`);
    }
    try {
      element = await this.findElement(driver);
      await element.clear();
    } catch (error) {
      return this.getErrorStatus(error);
    }
    return new Status(Code.OK, `${this.constructor.name} Action successful!`);
  }

  public toAlexActions(): Action[] {
    if (this.recommendedLocator) {
      return [new WebClear(this.recommendedLocator.toAlexNode())];
    }
    throw new Error(
      'No recommended locator specified, yet! Please run at least one test for this sequence before exporting it.',
    );
  }
}
