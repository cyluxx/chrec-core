import { WebDriver } from 'selenium-webdriver';
import { WebBrowser } from '../../export/alex/action';
import { Code, Status } from '../status';
import { Action, ActionJSON } from './action';

export class Refresh extends Action {
  constructor(image: string) {
    super(image);
  }

  public async run(driver: WebDriver): Promise<Status> {
    try {
      await driver.navigate().refresh();
      return new Status(Code.OK, `${this.constructor.name} Action successful!`);
    } catch (error) {
      return Promise.reject(new Status(Code.ACTION_FAILED, `${this.constructor.name} Action Failed!`));
    }
  }

  public toAlexActions(): WebBrowser[] {
    return [new WebBrowser('REFRESH')];
  }
}
