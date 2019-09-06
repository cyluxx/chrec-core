import { WebDriver } from 'selenium-webdriver';

export abstract class Browser {
  constructor(
    public className: string,
    public name: string,
    public width: number,
    public height: number,
    public sleepMsBetweenActions: number,
  ) { }

  public abstract buildWebDriver(seleniumServerUrl: string): WebDriver;
}
