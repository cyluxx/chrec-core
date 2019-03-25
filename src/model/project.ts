import { Sequence } from './sequence';
import { ProjectTestResult } from './test-result/project-test-result';

export class Project {
  constructor(private name: string, private sequences: Sequence[], private projectTestResults: ProjectTestResult[]) { }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public addSequence(sequence: Sequence): void {
    this.sequences.push(sequence);
  }

  public getSequences(): Sequence[] {
    return this.sequences;
  }

  public setSequences(sequences: Sequence[]): void {
    this.sequences = sequences;
  }

  public addTestResult(testResult: ProjectTestResult) {
    this.projectTestResults.push(testResult);
  }

  public getTestResults(): ProjectTestResult[] {
    return this.projectTestResults;
  }
}
