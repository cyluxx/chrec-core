import { Locator as SeleniumLocator, WebDriver, WebElement } from 'selenium-webdriver';
import { Node } from '../../export/alex/node';

export enum Method {
  CSS_SELECTOR_GENERATOR = 'CssSelectorGenerator',
  FINDER = 'Finder',
  GET_QUERY_SELECTOR = 'GetQuerySelector',
  OPTIMAL_SELECT = 'OptimalSelect',
  SELECTOR_QUERY = 'SelectorQuery',
  ROBULA_PLUS = 'RobulaPlus',
}

export interface LocatorJSON {
  className: string;
  method: Method;
  value: string;
}

export abstract class Locator {
  constructor(public method: Method, public value: string) { }

  public toJSON(): LocatorJSON {
    return Object.assign({ className: this.constructor.name }, this);
  }

  public async test(driver: WebDriver): Promise<void> {
    try {
      await this.findElement(driver);
    } catch (error) {
      throw this.getError;
    }
  }

  public abstract toSeleniumLocator(): SeleniumLocator;

  public abstract async findElement(driver: WebDriver): Promise<WebElement>;

  public abstract toAlexNode(): Node;

  private getError(error: Error): Error {
    if (error.name === 'NoSuchElementError') {
      return new Error(`${this.method} ${this.constructor.name} not found!`);
    }
    return error;
  }
}
