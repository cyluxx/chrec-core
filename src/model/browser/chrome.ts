import { Browser as BrowserName, Builder, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { Browser } from '../browser';

export class Chrome extends Browser {
  public headless: boolean;

  constructor(name: string, width: number, height: number, sleepMsBetweenActions: number, headless?: boolean) {
    super(name, width, height, sleepMsBetweenActions);
    if (headless) {
      this.headless = headless;
    } else {
      this.headless = false;
    }
  }

  public buildWebDriver(seleniumServerUrl: string): WebDriver {
    const builder: Builder = new Builder().forBrowser(BrowserName.CHROME).usingServer(seleniumServerUrl);
    if (this.headless) {
      builder.setChromeOptions(new Options().addArguments('--headless'));
    }
    const driver: WebDriver = builder.build();
    driver.manage().deleteAllCookies();
    driver
      .manage()
      .window()
      .setSize(this.width, this.height);
    return driver;
  }
}
