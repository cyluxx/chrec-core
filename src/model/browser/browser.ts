import { WebDriver } from 'selenium-webdriver';

export abstract class Browser {
  constructor(public name: string, public width: number, public height: number, public sleepMsBetweenActions: number) {}

  public toJSON(): object {
    return Object.assign({ className: this.constructor.name }, this);
  }

  public abstract buildWebDriver(seleniumServerUrl: string): WebDriver;
}
