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

export const Greeter = (name: string) => `Hello ${name}`;

export class Core {
  private replayService: ReplayService;

  constructor(private settings: Settings) {
    this.replayService = new ReplayService();
  }

  public addProjectTest(project: Project): Project {
    return project;
  }

  public addSequenceTest(sequence: Sequence): SequenceTestResult {
    const currentDate: Date = new Date();
    const browserTestResults: BrowserTestResult[] = [];
    for (const browser of this.settings.getBrowsers()) {
      const actionTestResults: ActionTestResult[] = [];
      for (const action of sequence.getActions()) {
        if (action instanceof HtmlElementAction) {
          const locatorTestResults: LocatorTestResult[] = [];
          for (const locator of action.getLocators()) {
            locatorTestResults.push(new LocatorTestResult(currentDate, locator, false));
          }
          actionTestResults.push(new HtmlElementActionTestResult(currentDate, action, locatorTestResults));
        } else {
          actionTestResults.push(new ActionTestResult(currentDate, action, false));
        }
      }
      browserTestResults.push(new BrowserTestResult(currentDate, browser, actionTestResults));
    }
    return new SequenceTestResult(currentDate, sequence, browserTestResults);
  }

  public setSettings(settings: Settings) {
    this.settings = settings;
  }
}
