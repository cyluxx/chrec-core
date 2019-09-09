import { Browser as BrowserName, Builder, WebDriver } from 'selenium-webdriver';
import { Browser, BrowserJSON } from './browser';

export class Firefox extends Browser {

  public static fromJSON(json: BrowserJSON): Firefox {
    const action = Object.create(Firefox.prototype);
    return Object.assign(action, json);
  }

  constructor(name: string, width: number, height: number, sleepMsBetweenActions: number) {
    super(name, width, height, sleepMsBetweenActions);
  }

  public buildWebDriver(seleniumServerUrl: string): WebDriver {
    const builder: Builder = new Builder().forBrowser(BrowserName.FIREFOX).usingServer(seleniumServerUrl);
    const driver: WebDriver = builder.build();
    driver.manage().deleteAllCookies();
    driver
      .manage()
      .window()
      .setSize(this.width, this.height);
    return driver;
  }
}
