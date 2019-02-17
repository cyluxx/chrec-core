import { WebDriver } from 'selenium-webdriver';
import { Code, Status } from '../status';
import { Action } from './action';

export class Back extends Action {
  constructor(image: string) {
    super(image);
  }

  public async run(driver: WebDriver): Promise<Status> {
    try {
      await driver.navigate().back();
      return new Status(Code.OK, 'Back Action Successful!');
    } catch (error) {
      return Promise.reject(new Status(Code.ACTION_FAILED, 'Back Action Failed!'));
    }
  }
}
