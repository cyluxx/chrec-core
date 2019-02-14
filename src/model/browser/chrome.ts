import { Browser as BrowserName, Builder, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { Browser } from './browser';

export class Chrome extends Browser {
  constructor(name: string, width: number, height: number, private headless: boolean) {
    super(name, width, height);
  }

  public buildWebDriver(seleniumGridUrl: string): WebDriver {
    const builder: Builder = new Builder().forBrowser(BrowserName.CHROME).usingServer(`http://${seleniumGridUrl}/wd/hub`);
    if (this.headless){
      builder.setChromeOptions(new Options().addArguments('--headless')).build();
    }
    const driver: WebDriver = builder.build();
    driver.manage().deleteAllCookies();
    driver.manage().window().setSize(this.width, this.height);
    return driver;
  }
}
