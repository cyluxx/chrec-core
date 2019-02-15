import { WebDriver, WebElement } from 'selenium-webdriver';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Status } from '../../status';
import { Action } from '../action';

export abstract class HtmlElementAction extends Action {
  private validLocator!: Locator;

  constructor(image: string, protected locators: Locator[], protected boundingBox: BoundingBox) {
    super(image);
  }

  public setValidLocator(locator: Locator) {
    this.validLocator = locator;
  }

  public getLocators(): Locator[] {
    return this.locators;
  }

  public async findElement(driver: WebDriver): Promise<WebElement> {
    return this.validLocator.findElement(driver);
  }

  public abstract async run(driver: WebDriver): Promise<Status>;
}
