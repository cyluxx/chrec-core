import { WebDriver, WebElement } from 'selenium-webdriver';
import { Action as AlexAction } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { Action } from '../action';

export abstract class HtmlElementAction extends Action {
  protected recommendedLocator!: Locator;

  constructor(className: string, image: string, protected locators: Locator[], protected boundingBox: BoundingBox) {
    super(className, image);
  }

  public getRecommendedLocator(): Locator {
    return this.recommendedLocator;
  }

  public setRecommendedLocator(locator: Locator): void {
    this.recommendedLocator = locator;
  }

  public addLocator(locator: Locator): void {
    this.locators.push(locator);
  }

  public getLocators(): Locator[] {
    return this.locators;
  }

  public setLocators(locators: Locator[]): void {
    this.locators = locators;
  }

  public getBoundingBox(): BoundingBox {
    return this.boundingBox;
  }

  public async findElement(driver: WebDriver): Promise<WebElement> {
    return this.recommendedLocator.findElement(driver);
  }

  public abstract async run(driver: WebDriver): Promise<Status>;

  public abstract toAlexActions(): AlexAction[];

  protected getErrorStatus(error: Error): Status {
    if (error.name === 'NoSuchElementError') {
      return new Status(
        Code.NO_SUCH_ELEMENT,
        `CSS Locator ${this.recommendedLocator.getMethodName()}: ${this.recommendedLocator.getClassName()} not found!`,
      );
    } else {
      return new Status(Code.HTML_ELEMENT_ACTION_FAILED, `Selenium Error: ${this.recommendedLocator.getClassName()} Action failed!`);
    }
  }
}
