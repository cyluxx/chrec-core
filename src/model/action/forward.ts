import { WebDriver } from 'selenium-webdriver';
import { Code, Status } from '../status';
import { Action } from './action';
import { WebBrowser } from '../../export/alex-export';

export class Forward extends Action {
  constructor(image: string) {
    super(image);
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
