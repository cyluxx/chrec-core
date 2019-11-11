import { WebDriver } from 'selenium-webdriver';
import { Action as AlexAction } from '../../export/alex/action';

export abstract class Action {
  constructor(public image: string) { }

  public toJSON(): object {
    return Object.assign({ className: this.constructor.name }, this);
  }

  public abstract async test(driver: WebDriver): Promise<void>;

  public abstract toAlexActions(): AlexAction[];
}
