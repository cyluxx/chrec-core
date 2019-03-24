import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action, WebCheckForText } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { HtmlElementAction } from './html-element-action';

export class Read extends HtmlElementAction {
  constructor(image: string, locators: Locator[], boundingBox: BoundingBox, private value: string) {
    super('Read', image, locators, boundingBox);
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
      const text = await element.getText();
      if (text.includes(this.value)) {
        return new Status(Code.OK, 'Read Action successful!');
      }
      return new Status(Code.READ_VALUE_NOT_IN_TEXT, 'Html Element does not contain desired value.');
    } catch (error) {
      return new Status(Code.HTML_ELEMENT_ACTION_FAILED, 'Read Action failed!');
    }
  }

  public toAlexActions(): Action[] {
    if (this.getRecommendedLocator()) {
      return [new WebCheckForText(this.value, this.getRecommendedLocator().toAlexNode())];
    }
    throw new Error(
      'No recommended locator specified, yet! Please run at least one test for this sequence before exporting it.',
    );
  }
}