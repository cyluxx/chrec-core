import loadJsonFile from 'load-json-file';
import { Project } from '../model/project';

export class ImportService {

  public async importFromChrecJson(absolutePath: string): Promise<Project> {
    try {
      return await loadJsonFile<Project>(absolutePath);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
