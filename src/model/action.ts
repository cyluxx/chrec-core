import { WebDriver } from 'selenium-webdriver';
import { ActionTestResult } from './action-test-result';
import { Browser } from './browser';
import { Identificable } from './identififable';

export abstract class Action extends Identificable {
  constructor(public testResults: ActionTestResult[], public image: string, id?: string) {
    super(id);
  }

  public toJSON(): object {
    return Object.assign({ className: this.constructor.name }, this);
  }

  public abstract addTestResult(testResult: ActionTestResult): void;

  public abstract async test(browser: Browser, driver: WebDriver): Promise<void>;
}
