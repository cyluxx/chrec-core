import loadJsonFile from 'load-json-file';
import { ModelFactory } from '../factory/model.factory';
import { Project } from '../model/project';

export class ImportService {
  private modelFactory: ModelFactory = new ModelFactory();

  public async importFromChrecJson(absolutePath: string): Promise<Project> {
    try {
      const parsedJson: any = await loadJsonFile(absolutePath);
      return this.modelFactory.projectFromChrecJson(parsedJson);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
