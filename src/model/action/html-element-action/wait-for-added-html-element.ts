import { until, WebDriver } from 'selenium-webdriver';
import { Action } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { HtmlElementAction } from './html-element-action';

export class WaitForAddedHtmlElement extends HtmlElementAction {
  constructor(image: string, locators: Locator[], boundingBox: BoundingBox, public timeout?: number) {
    super('WaitForAddedHtmlElement', image, locators, boundingBox);
  }

  public async run(driver: WebDriver): Promise<Status> {
    if (!this.recommendedLocator) {
      return new Status(Code.RECOMMENDED_LOCATOR_NOT_SPECIFIED, `${this.className} Action: Recommended Locator not Specified!`);
    }
    try {
      await driver.wait(until.elementLocated(this.getSeleniumLocator()), this.timeout);
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
