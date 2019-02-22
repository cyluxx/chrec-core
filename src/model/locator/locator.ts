import { WebDriver, WebElement } from 'selenium-webdriver';
import { Node } from '../../export/alex/node';
import { Status } from '../status';

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
