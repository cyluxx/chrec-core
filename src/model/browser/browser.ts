import { WebDriver } from 'selenium-webdriver';

export abstract class Browser {
  constructor(private name: string, protected width: number, protected height: number) {}

  public abstract buildWebDriver(seleniumServerUrl: string): WebDriver;
}
