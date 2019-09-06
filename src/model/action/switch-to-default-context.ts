import { WebDriver } from 'selenium-webdriver';
import { Action as AlexAction } from '../../export/alex/action';
import { Code, Status } from '../status';
import { Action } from './action';

export class SwitchToDefaultContext extends Action {
  constructor(image: string) {
    super('SwitchToDefaultContext', image);
  }

  public async run(driver: WebDriver): Promise<Status> {
    try {
      await driver.switchTo().defaultContent();
    } catch (error) {
      return new Status(Code.ACTION_FAILED, `${this.className} Action Failed!`)
    }
    return new Status(Code.OK, `${this.className} Action successful!`);
  }

  public toAlexActions(): AlexAction[] {
    throw new Error(
      'Not implemented yet',
    );
  }
}