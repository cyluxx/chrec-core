import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action, WebSelect } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { HtmlElementAction } from './html-element-action';

export class Select extends HtmlElementAction {
  constructor(
    image: string,
    locators: Locator[],
    boundingBox: BoundingBox,
    private value: string
  ) {
    super('Select', image, locators, boundingBox);
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
      return new Status(Code.RECOMMENDED_LOCATOR_NOT_SPECIFIED, `${this.getClassName()} Action: Recommended Locator not Specified!`);
    }
    try {
      element = await this.findElement(driver);
      await element.sendKeys(this.value);
      return new Status(Code.OK, `${this.getClassName()} Action successful!`);
    } catch (error) {
      return this.getErrorStatus(error);
    }
  }

  public toAlexActions(): Action[] {
    if (this.getRecommendedLocator()) {
      return [
        new WebSelect(this.value, this.getRecommendedLocator().toAlexNode())
      ];
    }
    throw new Error(
      'No recommended locator specified, yet! Please run at least one test for this sequence before exporting it.',
    );
  }
}
