import { Project } from './model/project';
import { Sequence } from './model/sequence';
import { Settings } from './model/settings';
import { ProjectTestResult } from './model/test-result/project-test-result';
import { SequenceTestResult } from './model/test-result/sequence-test-result';
import { ReplayService } from './service/replay.service';

export class Core {
  private replayService: ReplayService;

  constructor() {
    this.replayService = new ReplayService();
  }

  public async addProjectTest(project: Project, settings: Settings): Promise<Project> {
    const testResult: ProjectTestResult = await this.replayService.testProject(project, settings);
    for (const sequence of project.getSequences()) {
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
