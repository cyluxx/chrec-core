import { Locator as SeleniumLocator, WebDriver, WebElement } from 'selenium-webdriver';
import { Node } from '../../export/alex/node';
import { Status } from '../status';
import { CssLocator } from './css-locator';
import { XpathLocator } from './xpath-locator';

export enum Method {
  CSS_SELECTOR_GENERATOR = 'CssSelectorGenerator',
  FINDER = 'Finder',
  GET_QUERY_SELECTOR = 'GetQuerySelector',
  OPTIMAL_SELECT = 'OptimalSelect',
  SELECTOR_QUERY = 'SelectorQuery',
  ROBULA_PLUS = 'RobulaPlus'
}

export interface LocatorJSON {
  className: string,
  method: Method,
  value: string
}

export abstract class Locator {

  public static fromJSON(json: LocatorJSON): Locator {
    switch (json.className) {
      case CssLocator.constructor.name:
        return CssLocator.fromJSON(json);

      case XpathLocator.constructor.name:
        return XpathLocator.fromJSON(json);

      default:
        throw new Error('Could not construct Locator from ChRec JSON!');
    }
  }

  constructor(public method: Method, public value: string) { }

  public toJSON(): LocatorJSON {
    return Object.assign({ className: this.constructor.name }, this);
  }

  public abstract toSeleniumLocator(): SeleniumLocator;

  public abstract async test(driver: WebDriver): Promise<Status>;

  public abstract async findElement(driver: WebDriver): Promise<WebElement>;

  public abstract toAlexNode(): Node;
}
