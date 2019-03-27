import { Project } from './model/project';
import { Sequence } from './model/sequence';
import { Settings } from './model/settings';
import { ProjectTestResult } from './model/test-result/project-test-result';
import { SequenceTestResult } from './model/test-result/sequence-test-result';
import { ExportService } from './service/export.service';
import { ImportService } from './service/import.service';
import { ReplayService } from './service/replay.service';
import { HtmlElementActionTestResult } from './model/test-result/html-element-action-test-result';
import { Locator } from './model/locator/locator';

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

  //todo iframe kram, (boundingboxmethod), rerecord modal, more stats

  public setRecommendedLocators(project: Project) {
    if (project.getTestResults().length > 0) {
      for (const sequenceTestResult of project
        .getTestResults()
        [project.getTestResults().length - 1].getSequenceTestResults()) {
        for (const browserTestResult of sequenceTestResult.getBrowserTestResults()) {
          for (const actionTestResult of browserTestResult.getActionTestResults()) {
            if (actionTestResult instanceof HtmlElementActionTestResult) {
              this.setRecommendedLocator(project, actionTestResult);
            }
          }
        }
      }
    }
  }

  public setRecommendedLocator(project: Project, htmlElementActionTestResult: HtmlElementActionTestResult): void {
    const locatorCounts: any[] = [];
    locatorCounts.push({ className: 'CssSelectorGenerator', count: project.getSuccessfulCssSelectorGeneratorCount() });
    locatorCounts.push({ className: 'Finder', count: project.getSuccessfulFinderCount() });
    locatorCounts.push({ className: 'GetQuerySelector', count: project.getSuccessfulGetQuerySelectorCount() });
    locatorCounts.push({ className: 'OptimalSelect', count: project.getSuccessfulOptimalSelectCount() });
    locatorCounts.push({ className: 'SelectorQuery', count: project.getSuccessfulSelectorQueryCount() });
    locatorCounts.push({ className: 'RobulaPlus', count: project.getSuccessfulRobulaPlusCount() });

    locatorCounts.sort(
      (a: any, b: any): number => {
        return b.count - a.count;
      },
    );

    for (const locatorCount of locatorCounts) {
      for (const locatorTestResult of htmlElementActionTestResult.getLocatorTestResults()) {
        const locator: Locator = locatorTestResult.getLocator();
        if (locatorTestResult.isReplayable() && locator.getClassName() === locatorCount.className) {
          htmlElementActionTestResult.getAction().setRecommendedLocator(locator);
          return;
        }
      }
    }
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
