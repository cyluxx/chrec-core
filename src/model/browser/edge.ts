import { Browser as BrowserName, Builder, WebDriver } from 'selenium-webdriver';
import { Browser, BrowserJSON } from './browser';

export class Edge extends Browser {
  constructor(name: string, width: number, height: number, sleepMsBetweenActions: number) {
    super(name, width, height, sleepMsBetweenActions);
  }

  public buildWebDriver(seleniumServerUrl: string): WebDriver {
    const builder: Builder = new Builder().forBrowser(BrowserName.EDGE).usingServer(seleniumServerUrl);
    const driver: WebDriver = builder.build();
    driver.manage().deleteAllCookies();
    driver
      .manage()
      .window()
      .setSize(this.width, this.height);
    return driver;
  }
}
