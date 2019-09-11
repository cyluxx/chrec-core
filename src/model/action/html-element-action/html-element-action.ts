import { Locator as SeleniumLocator, WebDriver, WebElement } from 'selenium-webdriver';
import { Action as AlexAction } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { Action, ActionJSON } from '../action';

export interface HtmlElementActionJSON extends ActionJSON {
  locators: Locator[],
  boundingBox: BoundingBox
}

export abstract class HtmlElementAction extends Action {

  public recommendedLocator!: Locator;

  constructor(image: string, public locators: Locator[], public boundingBox: BoundingBox) {
    super(image);
  }

  public addLocator(locator: Locator): void {
    this.locators.push(locator);
  }

  public async findElement(driver: WebDriver): Promise<WebElement> {
    return this.recommendedLocator.findElement(driver);
  }

  public getSeleniumLocator(): SeleniumLocator {
    return this.recommendedLocator.toSeleniumLocator();
  }

  public abstract async run(driver: WebDriver): Promise<Status>;

  public abstract toAlexActions(): AlexAction[];

  protected getErrorStatus(error: Error): Status {
    if (error.name === 'NoSuchElementError') {
      return new Status(
        Code.NO_SUCH_ELEMENT,
        `CSS Locator ${this.recommendedLocator.method}: ${this.recommendedLocator.constructor.name} not found!`,
      );
    } else {
      return new Status(Code.HTML_ELEMENT_ACTION_FAILED, `Selenium Error: ${this.recommendedLocator.method} Action failed!`);
    }
  }
}
