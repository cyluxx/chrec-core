import { WebDriver } from 'selenium-webdriver';
import { Action as AlexAction } from '../export/alex/action';
import { ActionTestResult } from './action-test-result';

export abstract class Action {
  constructor(public testResults: ActionTestResult[], public image: string) { }

  public toJSON(): object {
    return Object.assign({ className: this.constructor.name }, this);
  }

  public addTestResult(testResult: ActionTestResult) {
    this.testResults.push(testResult);
  }

  public abstract async test(driver: WebDriver): Promise<void>;

  public abstract toAlexActions(): AlexAction[];
}
