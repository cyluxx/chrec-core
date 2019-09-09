import { WebDriver } from 'selenium-webdriver';
import { Action as AlexAction } from '../../export/alex/action';
import { Code, Status } from '../status';
import { Action, ActionJSON } from './action';

export class SwitchToDefaultContext extends Action {

  public static fromJSON(json: ActionJSON): SwitchToDefaultContext {
    const action = Object.create(SwitchToDefaultContext.prototype);
    return Object.assign(action, json);
  }

  constructor(image: string) {
    super(image);
  }

  public async run(driver: WebDriver): Promise<Status> {
    try {
      await driver.switchTo().defaultContent();
    } catch (error) {
      return new Status(Code.ACTION_FAILED, `${this.constructor.name} Action Failed!`)
    }
    return new Status(Code.OK, `${this.constructor.name} Action successful!`);
  }

  public toAlexActions(): AlexAction[] {
    throw new Error(
      'Not implemented yet',
    );
  }
}