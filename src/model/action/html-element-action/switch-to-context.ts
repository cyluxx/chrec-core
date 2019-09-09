import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { HtmlElementAction, HtmlElementActionJSON } from './html-element-action';

export class SwitchToContext extends HtmlElementAction {

  public static fromJSON(json: HtmlElementActionJSON): SwitchToContext {
    const action = Object.create(SwitchToContext.prototype);
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
      await driver.switchTo().frame(element);
    } catch (error) {
      return this.getErrorStatus(error);
    }
    return new Status(Code.OK, `${this.constructor.name} Action successful!`);
  }

  public toAlexActions(): Action[] {
    throw new Error(
      'Not implemented yet',
    );
  }
}
