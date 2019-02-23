import { WebDriver } from 'selenium-webdriver';

export abstract class Browser {
  constructor(private className: string, private name: string, protected width: number, protected height: number) {}

  public getClassName(): string {
    return this.className;
  }

  public getName(): string {
    return this.name;
  }

  public abstract buildWebDriver(seleniumServerUrl: string): WebDriver;
}
