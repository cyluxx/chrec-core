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
    for (const sequence of project.getSequences()) {
      const steps: Step[] = [];
      for (let i: number = 0; i < sequence.getActions().length; i++) {
        steps.push(new Step(sequence.getActions()[i].toAlexAction(), i));
      }
      symbols.push(new AlexSymbol(sequence.getName(), steps));
    }
    const symbolGroup = new SymbolGroup(project.getName(), symbols);
    return new AlexExport(symbolGroup);
  }
}
