import { WebDriver } from 'selenium-webdriver';
import { WebBrowser } from '../../export/alex/action';
import { Code, Status } from '../status';
import { Action } from './action';

export class Forward extends Action {
  constructor(image: string) {
    super('Forward', image);
  }

  public async run(driver: WebDriver): Promise<Status> {
    try {
      await driver.navigate().forward();
      return new Status(Code.OK, 'Forward Action Successful!');
    } catch (error) {
      return Promise.reject(new Status(Code.ACTION_FAILED, 'Forward Action Failed!'));
    }
  }

  public toAlexAction(): WebBrowser {
    throw new Error('Export Error: Alex does not support Forward Action!');
  }
}
