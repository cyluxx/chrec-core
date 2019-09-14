import { By, Locator as SeleniumLocator, WebDriver, WebElement } from 'selenium-webdriver';
import { Node, NodeType } from '../../export/alex/node';
import { Code, Status } from '../status';
import { Locator, LocatorJSON, Method } from './locator';

export class XpathLocator extends Locator {
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
    return await driver.findElement(By.xpath(this.value));
  }

  public toSeleniumLocator(): SeleniumLocator {
    return By.xpath(this.value);
  }

  public toAlexNode(): Node {
    return new Node(this.value, NodeType.XPATH);
  }

  private ok(): Status {
    return new Status(Code.OK, `XPath Locator ${this.method}: ${this.value} found!`);
  }

  private noSuchElement(): Status {
    return new Status(Code.NO_SUCH_ELEMENT, `XPath Locator ${this.method}: ${this.value} not found!`);
  }
}
