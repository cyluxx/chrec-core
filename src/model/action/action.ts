import { WebDriver, WebElement } from 'selenium-webdriver';
import { Status } from '../status';

export abstract class Action {
  constructor(private image: string) {}

  public getImage(): string {
    return this.image;
  }

  public setImage(image: string) {
    this.image = image;
  }

  public abstract async run(driver: WebDriver): Promise<Status>;
}
