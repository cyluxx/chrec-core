import * as util from 'util';
import { set, DataOptions } from 'electron-json-storage';
import { AlexExport, SymbolGroup, Symbol, Step, Action as AlexAction, Node, NodeType } from '../export/alex-export';
import { Project } from '../model/project';
import { Status, Code } from '../model/status';

export class AlexExportService {
  private set: (fileName: string, object: object, options: DataOptions, error: any) => Promise<void>;

  constructor() {
    this.set = util.promisify(set);
  }

  public convert(project: Project): AlexExport {
    let symbols: Symbol[] = [];
    for (let sequence of project.getSequences()) {
      let steps: Step[] = [];
      for (let i: number = 0; i < sequence.getActions().length; i++) {
        steps.push(new Step(sequence.getActions()[i].toAlexAction(), i));
      }
      symbols.push(new Symbol(sequence.name, steps));
    }
    let symbolGroup = new SymbolGroup(symbols);
    return new AlexExport(symbolGroup);
  }

  public async save(fileName: string, alexExport: AlexExport, path: string): Promise<Status> {
    try {
      await this.set(fileName, alexExport, { dataPath: path }, 'Save Error');
      return new Status(Code.OK, `Saved ALEX export ${fileName} successfully at ${path}!`);
    } catch (error) {
      return new Status(Code.ALEX_EXPORT_FAILED, 'Failed to save ALEX export to file system!');
    }
  }
}
