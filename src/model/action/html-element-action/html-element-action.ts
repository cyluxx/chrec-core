import { WebDriver, WebElement } from 'selenium-webdriver';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Status } from '../../status';
import { Action } from '../action';
import { Action as AlexAction } from '../../../export/alex-export';

export abstract class HtmlElementAction extends Action {
  private recommendedLocator!: Locator;

  constructor(image: string, protected locators: Locator[], protected boundingBox: BoundingBox) {
    super(image);
  }

  public getRecommendedLocator(): Locator {
    return this.recommendedLocator;
  }

  public setRecommendedLocator(locator: Locator): void {
    this.recommendedLocator = locator;
  }

  public getLocators(): Locator[] {
    return this.locators;
  }

  public async findElement(driver: WebDriver): Promise<WebElement> {
    return this.recommendedLocator.findElement(driver);
  }

  public abstract async run(driver: WebDriver): Promise<Status>;

  public abstract toAlexAction(): AlexAction;
}
