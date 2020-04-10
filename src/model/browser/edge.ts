import { Browser as BrowserName, Builder } from 'selenium-webdriver';
import { Browser } from '../browser';

export class Edge extends Browser {
  constructor(name: string, width: number, height: number, sleepMsBetweenActions: number, id?: string) {
    super(name, width, height, sleepMsBetweenActions, id);
  }

  public getBuilder(seleniumServerUrl: string): Builder {
    return new Builder().forBrowser(BrowserName.EDGE).usingServer(seleniumServerUrl);
  }
}
