import { Browser } from './browser/browser';

export class Settings {
  constructor(private seleniumServerUrl: string, private browsers: Browser[]) {}

  public getSeleniumServerUrl(): string {
    return this.seleniumServerUrl;
  }

  public getBrowsers(): Browser[] {
    return this.browsers;
  }
}
