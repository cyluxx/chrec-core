import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action, WebCheckForText } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { HtmlElementAction } from './html-element-action';

export class Read extends HtmlElementAction {
  constructor(image: string, locators: Locator[], boundingBox: BoundingBox, public value: string) {
    super('Read', image, locators, boundingBox);
  }

  public async run(driver: WebDriver): Promise<Status> {
    let element: WebElement;
    if (!this.recommendedLocator) {
      return new Status(Code.RECOMMENDED_LOCATOR_NOT_SPECIFIED, `${this.className} Action: Recommended Locator not Specified!`);
    }
    try {
      element = await this.findElement(driver);
      const text = await element.getText();
      if (text.includes(this.value)) {
        return new Status(Code.OK, `${this.className} Action successful!`);
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
