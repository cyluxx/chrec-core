import { Project } from './model/project';
import { Sequence } from './model/sequence';
import { Settings } from './model/settings';
import { ProjectTestResult } from './model/test-result/project-test-result';
import { SequenceTestResult } from './model/test-result/sequence-test-result';
import { ExportService } from './service/export.service';
import { ImportService } from './service/import.service';
import { ReplayService } from './service/replay.service';

export class Core {
  private exportService: ExportService;
  private importService: ImportService;
  private replayService: ReplayService;

  constructor() {
    this.exportService = new ExportService();
    this.importService = new ImportService();
    this.replayService = new ReplayService();
  }

  public async addProjectTest(project: Project, settings: Settings): Promise<Project> {
    const testResult: ProjectTestResult = await this.replayService.testProject(project, settings);
    project.addTestResult(testResult);
    return project;
  }

  public async addSequenceTest(project: Project, sequence: Sequence, settings: Settings): Promise<Project> {
    const sequenceTestResult: SequenceTestResult = await this.replayService.testSequence(sequence, settings);
    const projectTestResult: ProjectTestResult = new ProjectTestResult(sequenceTestResult.getDate(), [
      sequenceTestResult,
    ]);
    project.addTestResult(projectTestResult);
    return project;
  }

  public exportToAlexJson(project: Project, dirName: string): void {
    this.exportService.exportToAlexJson(dirName + project.getName(), project);
  }

  public exportToChrecJson(project: Project, dirName: string): void {
    this.exportService.exportToChrecJson(dirName + project.getName(), project);
  }

  public async importFromChrecJson(absolutePath: string): Promise<Project> {
    return this.importService.importFromChrecJson(absolutePath);
  }
}
