import { Browser } from './browser/browser';

export class Settings {
  constructor(private seleniumGridUrl: string, private browsers: Browser[]) {}

  public getSeleniumGridUrl(): string {
    return this.seleniumGridUrl;
  }

  public getBrowsers(): Browser[] {
    return this.browsers;
  }
}
