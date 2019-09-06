import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { HtmlElementAction } from './html-element-action';

export class SwitchToContext extends HtmlElementAction {
  constructor(image: string, locators: Locator[], boundingBox: BoundingBox) {
    super('SwitchToContext', image, locators, boundingBox);
  }

  public async run(driver: WebDriver): Promise<Status> {
    let element: WebElement;
    if (!this.recommendedLocator) {
      return new Status(Code.RECOMMENDED_LOCATOR_NOT_SPECIFIED, `${this.className} Action: Recommended Locator not Specified!`);
    }
    try {
      element = await this.findElement(driver);
      await driver.switchTo().frame(element);
    } catch (error) {
      return this.getErrorStatus(error);
    }
    return new Status(Code.OK, `${this.className} Action successful!`);
  }

  public toAlexActions(): Action[] {
    throw new Error(
      'Not implemented yet',
    );
  }
}
