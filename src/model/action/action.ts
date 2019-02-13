import { ActionTestResult } from '../test-result/action-test-result';
import { Testable } from '../testable';

export abstract class Action extends Testable{
  constructor(private image: string, testResults: ActionTestResult[]) {
    super(testResults);
  }

  public getImage(): string {
    return this.image;
  }

  public setImage(image: string) {
    this.image = image;
  }
}
