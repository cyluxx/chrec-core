import { WebDriver } from 'selenium-webdriver';
import { Code, Status } from '../status';
import { Action } from './action';

export class GoTo extends Action {
  constructor(image: string, private url: string) {
    super(image);
  }

  public async run(driver: WebDriver): Promise<Status> {
    driver.navigate().back();
    return new Status(Code.OK, 'GoTo Action Successful!');
  }
}
