import { WebDriver } from 'selenium-webdriver';
import { Action as AlexAction } from '../../export/alex/action';
import { Status } from '../status';

export interface ActionJSON {
  className: string,
  image: string
}

export abstract class Action {

  constructor(public image: string) { }

  public toJSON(): ActionJSON {
    return Object.assign({ className: this.constructor.name }, this);
  }

  public abstract async run(driver: WebDriver): Promise<Status>;

  public abstract toAlexActions(): AlexAction[];
}
