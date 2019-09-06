import writeJsonFile from 'write-json-file';
import { AlexExport } from '../export/alex/alex-export';
import { Step } from '../export/alex/step';
import { Symbol as AlexSymbol } from '../export/alex/symbol';
import { SymbolGroup } from '../export/alex/symbol-group';
import { Project } from '../model/project';
import { Code, Status } from '../model/status';

export class ExportService {
  public async exportToAlexJson(absolutePath: string, project: Project): Promise<Status> {
    try {
      await writeJsonFile(absolutePath, this.convertToAlex(project));
      return new Status(Code.OK, `Saved ALEX export successfully at ${absolutePath}!`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async exportToChrecJson(absolutePath: string, project: Project): Promise<Status> {
    try {
      await writeJsonFile(absolutePath, project);
      return new Status(Code.OK, `Saved ChRec export successfully at ${absolutePath}!`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public convertToAlex(project: Project): AlexExport {
    const symbols: AlexSymbol[] = [];
    for (const sequence of project.sequences) {
      const steps: Step[] = [];
      let i: number = 0;
      for (const action of sequence.actions) {
        for (const alexAction of action.toAlexActions()) {
          steps.push(new Step(alexAction, i));
          i++;
        }
      }
      symbols.push(new AlexSymbol(sequence.name, steps));
    }
    const symbolGroup = new SymbolGroup(project.name, symbols);
    return new AlexExport(symbolGroup);
  }
}
