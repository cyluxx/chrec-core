import { By, Locator as SeleniumLocator, WebDriver, WebElement } from 'selenium-webdriver';
import { Node, NodeType } from '../../export/alex/node';
import { Code, Status } from '../status';
import { Locator } from './locator';

export class CssLocator extends Locator {
  constructor(methodName: string, value: string) {
    super('CssLocator', methodName, value);
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
    return new Status(Code.OK, `CSS Locator ${this.methodName}: ${this.value} found!`);
  }

  private noSuchElement(): Status {
    return new Status(Code.NO_SUCH_ELEMENT, `CSS Locator ${this.methodName}: ${this.value} not found!`);
  }
}
