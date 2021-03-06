import { Browser } from './browser';

export class Settings {
  constructor(public seleniumServerUrl: string, public browsers: Browser[]) {}

  public addBrowser(browser: Browser): void {
    this.browsers.push(browser);
  }
}
