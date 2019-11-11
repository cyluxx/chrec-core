import { WebDriver } from 'selenium-webdriver';
import { WebGoTo } from '../../export/alex/action';
import { Action } from './action';

export class GoTo extends Action {
  constructor(image: string, public url: string) {
    super(image);
  }

  public async test(driver: WebDriver): Promise<void> {
    await driver.navigate().to(this.url);
  }

  public toAlexActions(): WebGoTo[] {
    return [new WebGoTo(this.url)];
  }
}
