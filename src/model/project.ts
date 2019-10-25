import { Locator } from './locator/locator';
import { Sequence } from './sequence';
import { ProjectTestResult } from './test-result/project-test-result';
import { TestResult } from './test-result/test-result';

export class Project extends TestResult{
  constructor(public name: string, public sequences: Sequence[], childTestResults: ProjectTestResult[]) {
    super(childTestResults)
  }

  public addSequence(sequence: Sequence) {
    this.sequences.push(sequence);
  }

  public addChildTestResult(childTestResult: ProjectTestResult) {
    this.childTestResults.push(childTestResult);
  }
}
