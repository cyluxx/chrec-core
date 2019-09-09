import { Locator as SeleniumLocator, WebDriver, WebElement } from 'selenium-webdriver';
import { Action as AlexAction } from '../../../export/alex/action';
import { BoundingBox } from '../../bounding-box';
import { Locator } from '../../locator/locator';
import { Code, Status } from '../../status';
import { Action, ActionJSON } from '../action';
import { Clear } from './clear';
import { Click } from './click';
import { Read, ReadJSON } from './read';
import { Select, SelectJSON } from './select';
import { Submit } from './submit';
import { SwitchToContext } from './switch-to-context';
import { Type, TypeJSON } from './type';
import { WaitForAddedHtmlElement } from './wait-for-added-html-element';
import { WaitForRemovedHtmlElement } from './wait-for-removed-html-element';

export interface HtmlElementActionJSON extends ActionJSON {
  locators: Locator[],
  boundingBox: BoundingBox
}

export abstract class HtmlElementAction extends Action {

  public static fromJSON(json: HtmlElementActionJSON): HtmlElementAction {
    switch (json.className) {
      case Clear.constructor.name:
        return Clear.fromJSON(json);

      case Click.constructor.name:
        return Click.fromJSON(json);

      case Read.constructor.name:
        return Read.fromJSON(json as ReadJSON);

      case Select.constructor.name:
        return Select.fromJSON(json as SelectJSON);

      case Submit.constructor.name:
        return Submit.fromJSON(json);

      case SwitchToContext.constructor.name:
        return SwitchToContext.fromJSON(json);

      case Type.constructor.name:
        return Type.fromJSON(json as TypeJSON);

      case WaitForAddedHtmlElement.constructor.name:
        return WaitForAddedHtmlElement.fromJSON(json);

      case WaitForRemovedHtmlElement.constructor.name:
        return WaitForRemovedHtmlElement.fromJSON(json);

      default:
        throw new Error('Could not construct Action from ChRec JSON!');
    }
  }

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
