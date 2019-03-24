import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action, WebClick } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { HtmlElementAction } from './html-element-action';

export class Click extends HtmlElementAction {
  constructor(image: string, locators: Locator[], boundingBox: BoundingBox) {
    super('Click', image, locators, boundingBox);
  }

  public async run(driver: WebDriver): Promise<Status> {
    try {
      const element: WebElement = await this.findElement(driver);
      element.click();
      return new Status(Code.OK, 'Click Action successful!');
    } catch (error) {
      return new Status(Code.HTML_ELEMENT_ACTION_FAILED, 'Click Action failed!');
    }
  }

  public toAlexActions(): Action[] {
    if (this.getRecommendedLocator()) {
      return [new WebClick(this.getRecommendedLocator().toAlexNode())];
    }
    throw new Error(
      'No recommended locator specified, yet! Please run at least one test for this sequence before exporting it.',
    );
  }
}
