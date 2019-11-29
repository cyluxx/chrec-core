import { Project } from './model/project';
import { Sequence } from './model/sequence';
import { Settings } from './model/settings';
import { ChrecJsonService } from './service/chrec-json.service';

export class Core {
  public chrecJsonService: ChrecJsonService;

  constructor() {
    this.chrecJsonService = new ChrecJsonService();
  }

  public async testProject(project: Project, settings: Settings): Promise<void> {
    await project.test(settings);
  }

  public async testSequence(sequence: Sequence, settings: Settings): Promise<void> {
    await sequence.test(settings);
  }

  public exportChrecJson(project: Project, dirName: string): void {
    this.chrecJsonService.exportChrecJson(dirName, project);
  }

  public async importChrecJson(absolutePath: string): Promise<Project> {
    return this.chrecJsonService.importChrecJson(absolutePath);
  }
}
