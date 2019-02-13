import { WebDriver } from 'selenium-webdriver';
import { Code, Status } from '../status';
import { Action } from './action';

export class Forward extends Action {
  constructor(image: string) {
    super(image);
  }

  public async run(driver: WebDriver): Promise<Status> {
    driver.navigate().back();
    return new Status(Code.OK, 'Forward Action Successful!');
  }
}
