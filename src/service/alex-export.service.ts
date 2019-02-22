import { DataOptions, set } from 'electron-json-storage';
import * as util from 'util';
import { AlexExport } from '../export/alex/alex-export';
import { Step } from '../export/alex/step';
import { Symbol as AlexSymbol } from '../export/alex/symbol';
import { SymbolGroup } from '../export/alex/symbol-group';
import { Project } from '../model/project';
import { Code, Status } from '../model/status';

export class AlexExportService {
  private set: (fileName: string, object: object, options: DataOptions, error: any) => Promise<void>;

  constructor() {
    this.set = util.promisify(set);
  }

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

  public async save(fileName: string, alexExport: AlexExport, path: string): Promise<Status> {
    try {
      await this.set(fileName, alexExport, { dataPath: path }, 'Save Error');
      return new Status(Code.OK, `Saved ALEX export ${fileName} successfully at ${path}!`);
    } catch (error) {
      throw new Error(error.message);
      // return new Status(Code.ALEX_EXPORT_FAILED, 'Failed to save ALEX export to file system!');
    }
  }
}
