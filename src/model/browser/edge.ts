import { Browser as BrowserName, Builder, WebDriver } from 'selenium-webdriver';
import { Browser } from './browser';

export class Edge extends Browser {
  constructor(name: string, width: number, height: number) {
    super(name, width, height);
  }

  public buildWebDriver(seleniumGridUrl: string): WebDriver {
    const builder: Builder = new Builder().forBrowser(BrowserName.EDGE).usingServer(`http://${seleniumGridUrl}/wd/hub`);
    const driver: WebDriver = builder.build();
    driver.manage().deleteAllCookies();
    driver.manage().window().setSize(this.width, this.height);
    return driver;
  }
}
