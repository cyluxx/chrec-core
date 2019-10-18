import { By, Locator as SeleniumLocator, WebDriver, WebElement } from 'selenium-webdriver';
import { Node, NodeType } from '../../export/alex/node';
import { Locator, Method } from './locator';

export class XpathLocator extends Locator {
  constructor(method: Method, value: string) {
    super(method, value);
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
}
