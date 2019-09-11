import { WebDriver } from 'selenium-webdriver';

export interface BrowserJSON {
  className: string,
  name: string,
  width: number,
  height: number,
  sleepMsBetweenActions: number
}

export abstract class Browser {

  constructor(
    public name: string,
    public width: number,
    public height: number,
    public sleepMsBetweenActions: number,
  ) { }

  public toJSON(): BrowserJSON {
    return Object.assign({ className: this.constructor.name }, this);
  }

  public abstract buildWebDriver(seleniumServerUrl: string): WebDriver;
}
