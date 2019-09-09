import { By, Locator as SeleniumLocator, WebDriver, WebElement } from 'selenium-webdriver';
import { Node, NodeType } from '../../export/alex/node';
import { Code, Status } from '../status';
import { Locator, LocatorJSON, Method } from './locator';

export class CssLocator extends Locator {

  public static fromJSON(json: LocatorJSON): CssLocator {
    const action = Object.create(CssLocator.prototype);
    return Object.assign(action, json);
  }

  constructor(method: Method, value: string) {
    super(method, value);
  }

  public async test(driver: WebDriver): Promise<Status> {
    try {
      await this.findElement(driver);
      return this.ok();
    } catch (error) {
      if (error.name === 'NoSuchElementError') {
        return this.noSuchElement();
      } else {
        throw new Error(error);
      }
    }
  }

  public async findElement(driver: WebDriver): Promise<WebElement> {
    return await driver.findElement(By.css(this.value));
  }

  public toSeleniumLocator(): SeleniumLocator {
    return By.css(this.value);
  }

  public toAlexNode(): Node {
    return new Node(this.value, NodeType.CSS);
  }

  private ok(): Status {
    return new Status(Code.OK, `CSS Locator ${this.method}: ${this.value} found!`);
  }

  private noSuchElement(): Status {
    return new Status(Code.NO_SUCH_ELEMENT, `CSS Locator ${this.method}: ${this.value} not found!`);
  }
}
