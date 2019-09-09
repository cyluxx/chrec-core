import { Browser as BrowserName, Builder, WebDriver } from 'selenium-webdriver';
import { Browser, BrowserJSON } from './browser';

export class InternetExplorer extends Browser {

  public static fromJSON(json: BrowserJSON): InternetExplorer {
    const action = Object.create(InternetExplorer.prototype);
    return Object.assign(action, json);
  }

  constructor(name: string, width: number, height: number, sleepMsBetweenActions: number) {
    super(name, width, height, sleepMsBetweenActions);
  }

  public buildWebDriver(seleniumServerUrl: string): WebDriver {
    const builder: Builder = new Builder().forBrowser(BrowserName.INTERNET_EXPLORER).usingServer(seleniumServerUrl);
    const driver: WebDriver = builder.build();
    driver.manage().deleteAllCookies();
    driver
      .manage()
      .window()
      .setSize(this.width, this.height);
    return driver;
  }
}
