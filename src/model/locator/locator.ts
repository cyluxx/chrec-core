import { WebDriver, WebElement } from 'selenium-webdriver';
import { Status } from '../status';

export abstract class Locator {
  constructor(protected methodName: string, protected value: string) {}

  public abstract async test(driver: WebDriver): Promise<Status>;

  public abstract async findElement(driver: WebDriver): Promise<WebElement>;
}
