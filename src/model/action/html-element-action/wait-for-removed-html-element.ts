import { until, WebDriver, WebElement } from 'selenium-webdriver';
import { Action } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { HtmlElementAction } from './html-element-action';

export class WaitForRemovedHtmlElement extends HtmlElementAction {
  constructor(image: string, locators: Locator[], boundingBox: BoundingBox, private timeout?: number) {
    super('WaitForRemovedHtmlElement', image, locators, boundingBox);
  }

  public async run(driver: WebDriver): Promise<Status> {
    if (!this.recommendedLocator) {
      return new Status(Code.RECOMMENDED_LOCATOR_NOT_SPECIFIED, `${this.getClassName()} Action: Recommended Locator not Specified!`);
    }
    try {
      const element: WebElement = await this.findElement(driver);
      await driver.wait(until.stalenessOf(element), this.timeout);
    } catch (error) {
      return this.getErrorStatus(error);
    }
    return new Status(Code.OK, `${this.getClassName()} Action successful!`);
  }

  public toAlexActions(): Action[] {
    throw new Error(
      'Not implemented yet',
    );
  }
}
