import writeJsonFile from 'write-json-file';
import { AlexExport } from '../export/alex/alex-export';
import { Step } from '../export/alex/step';
import { Symbol as AlexSymbol } from '../export/alex/symbol';
import { SymbolGroup } from '../export/alex/symbol-group';
import { Project } from '../model/project';

export class ExportService {
  public async exportAlexJson(absolutePath: string, project: Project): Promise<void> {
    await writeJsonFile(absolutePath, this.convertToAlex(project));
  }

  public async exportChrecJson(absolutePath: string, project: Project): Promise<void> {
    const json = { name: 'ChRec', version: process.env.npm_package_version, project };
    await writeJsonFile(absolutePath, json);
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
