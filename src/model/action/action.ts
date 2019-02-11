import { ActionTestResult } from '../test-result/action-test-result';

export abstract class Action {
  constructor(private image: string, private testResults: ActionTestResult[]) {}

  public getImage(): string {
    return this.image;
  }

  public setImage(image: string) {
    this.image = image;
  }
}
