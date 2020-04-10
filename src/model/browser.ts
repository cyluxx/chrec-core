import { Builder, WebDriver } from 'selenium-webdriver';
import { Identificable } from './identififable';

export abstract class Browser extends Identificable {
  constructor(
    public name: string,
    public width: number,
    public height: number,
    public sleepMsBetweenActions: number,
    id?: string,
  ) {
    super(id);
  }

  public toJSON(): object {
    return Object.assign({ className: this.constructor.name }, this);
  }

  public async buildWebDriver(seleniumServerUrl: string): Promise<WebDriver> {
    const driver: WebDriver = this.getBuilder(seleniumServerUrl).build();
    await driver.manage().deleteAllCookies();
    await driver
      .manage()
      .window()
      .setSize(this.width, this.height);
    return driver;
  }

  public abstract getBuilder(seleniumServerUrl: string): Builder;
}
