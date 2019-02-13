import { Sequence } from './sequence';
import { ProjectTestResult } from './test-result/project-test-result';

export class Project {
  constructor(private name: string, private sequences: Sequence[], private testResults: ProjectTestResult[]) {}
}