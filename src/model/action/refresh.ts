import { WebDriver } from 'selenium-webdriver';
import { WebBrowser } from '../../export/alex/action';
import { Code, Status } from '../status';
import { Action } from './action';

export class Refresh extends Action {
  constructor(image: string) {
    super(image);
  }

  public async run(driver: WebDriver): Promise<Status> {
    try {
      await driver.navigate().refresh();
      return new Status(Code.OK, 'Refresh Action Successful!');
    } catch (error) {
      return Promise.reject(new Status(Code.ACTION_FAILED, 'Refresh Action Failed!'));
    }
  }

  public toAlexAction(): WebBrowser {
    return new WebBrowser('REFRESH');
  }
}
