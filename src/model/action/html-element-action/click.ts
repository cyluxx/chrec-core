import { WebDriver, WebElement } from 'selenium-webdriver';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { HtmlElementAction } from './html-element-action';

export class Click extends HtmlElementAction {
  constructor(image: string, locators: Locator[], boundingBox: BoundingBox) {
    super(image, locators, boundingBox);
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
}
