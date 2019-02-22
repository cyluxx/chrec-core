import writeJsonFile from 'write-json-file';
import { AlexExport } from '../export/alex/alex-export';
import { Step } from '../export/alex/step';
import { Symbol as AlexSymbol } from '../export/alex/symbol';
import { SymbolGroup } from '../export/alex/symbol-group';
import { Project } from '../model/project';
import { Code, Status } from '../model/status';

export class AlexExportService {
  public convert(project: Project): AlexExport {
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

  public async save(absolutePath: string, alexExport: AlexExport): Promise<Status> {
    try {
      await writeJsonFile(absolutePath, alexExport);
      return new Status(Code.OK, `Saved ALEX export successfully at ${absolutePath}!`);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
