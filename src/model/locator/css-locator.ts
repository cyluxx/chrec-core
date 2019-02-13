import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { Code, Status } from '../status';
import { Locator } from './locator';

export class CssLocator extends Locator {
  constructor(methodName: string, value: string) {
    super(methodName, value);
  }

  public async test(driver: WebDriver): Promise<Status> {
    try {
      await driver.findElement(By.css(this.value));
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

  private ok(): Status {
    return new Status(Code.OK, `CSS Locator ${this.methodName}: ${this.value} found!`);
  }

  private noSuchElement(): Status {
    return new Status(Code.NO_SUCH_ELEMENT, `CSS Locator ${this.methodName}: ${this.value} not found!`);
  }
}
