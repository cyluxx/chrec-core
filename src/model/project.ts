import { Sequence } from './sequence';
import { ProjectTestResult } from './test-result/project-test-result';
import { Testable } from './testable';

export class Project extends Testable{
  constructor(private name: string, private sequences: Sequence[], testResults: ProjectTestResult[]) {
    super(testResults);
  }
}
