import writeJsonFile from 'write-json-file';
import { Project } from '../model/project';

export class ExportService {

  public async exportChrecJson(absolutePath: string, project: Project): Promise<void> {
    const json = { name: 'ChRec', version: process.env.npm_package_version, project };
    await writeJsonFile(absolutePath, json);
  }
}
