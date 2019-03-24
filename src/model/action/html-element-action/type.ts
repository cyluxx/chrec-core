import { WebDriver, WebElement } from 'selenium-webdriver';
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
    super('Read', image, locators, boundingBox);
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
    try {
      const element: WebElement = await this.findElement(driver);
      element.sendKeys(this.value, this.key);
      return new Status(Code.OK, 'Type Action successful!');
    } catch (error) {
      return new Status(Code.HTML_ELEMENT_ACTION_FAILED, 'Type Action failed!');
    }
  }

  public toAlexActions(): Action[] {
    if (this.getRecommendedLocator()) {
      return [new WebFill(this.value, this.getRecommendedLocator().toAlexNode()), new WebPressKey(this.key, this.getRecommendedLocator().toAlexNode())];
    }
    throw new Error(
      'No recommended locator specified, yet! Please run at least one test for this sequence before exporting it.'
    );
  }
}
