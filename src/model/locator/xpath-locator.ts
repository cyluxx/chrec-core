import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { Code, Status } from '../status';
import { Locator } from './locator';
import { Node, NodeType } from '../../export/alex-export';

export class XpathLocator extends Locator {
  constructor(methodName: string, value: string) {
    super(methodName, value);
  }

  public async test(driver: WebDriver): Promise<Status> {
    try {
      await driver.findElement(By.xpath(this.value));
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
    return await driver.findElement(By.xpath(this.value));
  }

  public toAlexNode(): Node {
    return new Node(this.value, NodeType.XPATH);
  }

  private ok(): Status {
    return new Status(Code.OK, `XPath Locator ${this.methodName}: ${this.value} found!`);
  }

  private noSuchElement(): Status {
    return new Status(Code.NO_SUCH_ELEMENT, `XPath Locator ${this.methodName}: ${this.value} not found!`);
  }
}
