import { Browser as BrowserName, Builder, WebDriver } from 'selenium-webdriver';
import { Browser } from './browser';

export class Firefox extends Browser {
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
