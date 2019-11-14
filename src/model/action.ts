import { WebDriver } from 'selenium-webdriver';
import { Action as AlexAction } from '../export/alex/action';
import { ActionTestResult } from './action-test-result';
import { Browser } from './browser';

export abstract class Action {
  constructor(public testResults: ActionTestResult[], public image: string) { }

  public toJSON(): object {
    return Object.assign({ className: this.constructor.name }, this);
  }

  public abstract addTestResult(testResult: ActionTestResult): void;

  public abstract async test(browser: Browser, driver: WebDriver): Promise<void>;

  public abstract toAlexActions(): AlexAction[];
}
