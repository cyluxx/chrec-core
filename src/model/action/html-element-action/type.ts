import { Key, WebDriver, WebElement } from 'selenium-webdriver';
import { Action, WebFill, WebPressKey } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { HtmlElementAction } from './html-element-action';

export class Type extends HtmlElementAction {
  constructor(
    image: string,
    locators: Locator[],
    boundingBox: BoundingBox,
    public value: string,
    public key: string,
  ) {
    super('Type', image, locators, boundingBox);
  }

  public async run(driver: WebDriver): Promise<Status> {
    let element: WebElement;
    if (!this.recommendedLocator) {
      return new Status(Code.RECOMMENDED_LOCATOR_NOT_SPECIFIED, `${this.className} Action: Recommended Locator not Specified!`);
    }
    try {
      element = await this.findElement(driver);
      if (this.key) {
        await element.sendKeys(this.value, this.key);
      } else {
        await element.sendKeys(this.value, Key.TAB);
      }
      return new Status(Code.OK, `${this.className} Action successful!`);
    } catch (error) {
      return this.getErrorStatus(error);
    }
  }

  public toAlexActions(): Action[] {
    if (this.recommendedLocator) {
      return [
        new WebFill(this.value, this.recommendedLocator.toAlexNode()),
        new WebPressKey(this.key, this.recommendedLocator.toAlexNode()),
      ];
    }
    throw new Error(
      'No recommended locator specified, yet! Please run at least one test for this sequence before exporting it.',
    );
  }
}
