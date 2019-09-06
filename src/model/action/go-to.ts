import { WebDriver } from 'selenium-webdriver';
import { WebGoTo } from '../../export/alex/action';
import { Code, Status } from '../status';
import { Action } from './action';

export class GoTo extends Action {
  constructor(image: string, public url: string) {
    super('GoTo', image);
  }

  public async run(driver: WebDriver): Promise<Status> {
    try {
      await driver.navigate().to(this.url);
      return new Status(Code.OK, 'GoTo Action Successful!');
    } catch (error) {
      return Promise.reject(new Status(Code.ACTION_FAILED, 'GoTo Action Failed!'));
    }
  }

  public toAlexActions(): WebGoTo[] {
    return [new WebGoTo(this.url)];
  }
}
