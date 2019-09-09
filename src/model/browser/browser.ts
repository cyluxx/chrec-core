import { WebDriver } from 'selenium-webdriver';
import { Chrome, ChromeJSON } from './chrome';
import { Edge } from './edge';
import { Firefox } from './firefox';
import { InternetExplorer } from './internet-explorer';

export interface BrowserJSON {
  className: string,
  name: string,
  width: number,
  height: number,
  sleepMsBetweenActions: number
}

export abstract class Browser {

  public static fromJSON(json: BrowserJSON): Browser {
    switch (json.className) {
      case Chrome.constructor.name:
        return Chrome.fromJSON(json as ChromeJSON);

      case Edge.constructor.name:
        return Edge.fromJSON(json);

      case Firefox.constructor.name:
        return Firefox.fromJSON(json);

      case InternetExplorer.constructor.name:
        return InternetExplorer.fromJSON(json);

      default:
        throw new Error('Could not construct Locator from ChRec JSON!');
    }
  }

  constructor(
    public name: string,
    public width: number,
    public height: number,
    public sleepMsBetweenActions: number,
  ) { }

  public toJSON(): BrowserJSON {
    return Object.assign({ className: this.constructor.name }, this);
  }

  public abstract buildWebDriver(seleniumServerUrl: string): WebDriver;
}
