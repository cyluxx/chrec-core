import { WebDriver } from 'selenium-webdriver';
import { WebGoTo } from '../../export/alex/action';
import { Code, Status } from '../status';
import { Action, ActionJSON } from './action';

export interface GoToJSON extends ActionJSON {
  url: string
}

export class GoTo extends Action {

  public static fromJSON(json: GoToJSON): GoTo {
    const action = Object.create(GoTo.prototype);
    return Object.assign(action, json);
  }

  constructor(image: string, public url: string) {
    super(image);
  }

  public toJSON(): GoToJSON {
    return Object.assign({ className: 'GoTo' }, this);
  }

  public async run(driver: WebDriver): Promise<Status> {
    try {
      await driver.navigate().to(this.url);
      return new Status(Code.OK, `${this.constructor.name} Action successful!`);
    } catch (error) {
      return Promise.reject(new Status(Code.ACTION_FAILED, `${this.constructor.name} Action Failed!`));
    }
  }

  public toAlexActions(): WebGoTo[] {
    return [new WebGoTo(this.url)];
  }
}
