import { Browser as BrowserName, Builder, WebDriver } from 'selenium-webdriver';
import { Browser } from '../browser';

export class InternetExplorer extends Browser {
  constructor(name: string, width: number, height: number, sleepMsBetweenActions: number) {
    super(name, width, height, sleepMsBetweenActions);
  }

  public getBuilder(seleniumServerUrl: string): Builder {
    return new Builder().forBrowser(BrowserName.INTERNET_EXPLORER).usingServer(seleniumServerUrl);
  }
}
