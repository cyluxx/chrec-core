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
    private value: string,
    private key: string,
  ) {
    super('Type', image, locators, boundingBox);
  }

  public getKey(): string {
    return this.key;
  }

  public setKey(key: string) {
    this.key = key;
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string) {
    this.value = value;
  }

  public async run(driver: WebDriver): Promise<Status> {
    let element: WebElement;
    if (!this.recommendedLocator) {
      return new Status(Code.RECOMMENDED_LOCATOR_NOT_SPECIFIED, 'Click Action: Recommended Locator not Specified!');
    }
    try {
      element = await this.findElement(driver);
      if (this.key) {
        await element.sendKeys(this.value, this.key);
      } else {
        await element.sendKeys(this.value, Key.TAB);
      }
      return new Status(Code.OK, 'Type Action successful!');
    } catch (error) {
      if (error.name === 'NoSuchElementError') {
        return new Status(Code.NO_SUCH_ELEMENT, `CSS Locator ${this.recommendedLocator.getMethodName()}: ${this.recommendedLocator.getClassName()} not found!`);
      } else {
        return new Status(Code.HTML_ELEMENT_ACTION_FAILED, 'Type Action failed!');
      }
    }
  }

  public toAlexActions(): Action[] {
    if (this.getRecommendedLocator()) {
      return [
        new WebFill(this.value, this.getRecommendedLocator().toAlexNode()),
        new WebPressKey(this.key, this.getRecommendedLocator().toAlexNode()),
      ];
    }
    throw new Error(
      'No recommended locator specified, yet! Please run at least one test for this sequence before exporting it.'
    );
  }
}
