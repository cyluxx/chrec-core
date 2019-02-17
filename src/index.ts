import { HtmlElementAction } from './model/action/html-element-action/html-element-action';
import { Project } from './model/project';
import { Sequence } from './model/sequence';
import { Settings } from './model/settings';
import { ActionTestResult } from './model/test-result/action-test-result';
import { BrowserTestResult } from './model/test-result/browser-test-result';
import { HtmlElementActionTestResult } from './model/test-result/html-element-action-test-result';
import { LocatorTestResult } from './model/test-result/locator-test-result';
import { SequenceTestResult } from './model/test-result/sequence-test-result';
import { ReplayService } from './service/replay.service';
import { ProjectTestResult } from './model/test-result/project-test-result';

export class Core {
  private replayService: ReplayService;

  constructor() {
    this.replayService = new ReplayService();
  }

  public async addProjectTest(project: Project, settings: Settings): Promise<Project> {
    const testResult: ProjectTestResult = await this.replayService.testProject(project, settings);
    for(const sequence of project.getSequences()){
      this.addSequenceTest(sequence, settings);
    }
    project.addTestResult(testResult);
    return project;
  }

  public async addSequenceTest(sequence: Sequence, settings: Settings): Promise<Sequence> {
    const testResult: SequenceTestResult = await this.replayService.testSequence(sequence, settings);
    sequence.addTestResult(testResult);
    return sequence;
  }
}
