import { HtmlElementActionTestResult } from './model/action-test-result/html-element-action-test-result';
import { HtmlElementAction } from './model/action/html-element-action';
import { Locator, Method } from './model/locator';
import { LocatorTestResult } from './model/locator-test-result';
import { Project } from './model/project';
import { Sequence } from './model/sequence';
import { Settings } from './model/settings';
import { ExportService } from './service/export.service';
import { ImportService } from './service/import.service';

export class Core {
  public exportService: ExportService;
  public importService: ImportService;

  constructor() {
    this.exportService = new ExportService();
    this.importService = new ImportService();
  }

  public async testProject(project: Project, settings: Settings): Promise<void> {
    await project.test(settings);
  }

  public async testSequence(sequence: Sequence, settings: Settings): Promise<void> {
    await sequence.test(settings);
  }

  public exportAlexJson(project: Project, dirName: string): void {
    this.exportService.exportAlexJson(dirName, project);
  }

  public exportChrecJson(project: Project, dirName: string): void {
    this.exportService.exportChrecJson(dirName, project);
  }

  public async importChrecJson(absolutePath: string): Promise<Project> {
    return this.importService.importChrecJson(absolutePath);
  }
}
