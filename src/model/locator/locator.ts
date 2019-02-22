import { WebDriver, WebElement } from 'selenium-webdriver';
import { Status } from '../status';
import { Node } from '../../export/alex-export';

export abstract class Locator {
  constructor(protected methodName: string, protected value: string) {}

  public getMethodName(): string {
    return this.methodName;
  }

  public getValue(): string {
    return this.value;
  }

  public abstract async test(driver: WebDriver): Promise<Status>;

  public abstract async findElement(driver: WebDriver): Promise<WebElement>;

  public abstract toAlexNode(): Node;
}
