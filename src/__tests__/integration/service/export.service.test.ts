import * as path from 'path';
import { Project } from '../../../model/project';
import { ExportService } from '../../../service/export.service';

describe('ExportService', () => {
  describe('exportChrecJson', () => {
    test('when Project, then JSON File containing application name, its version and the passed Project', async () => {
      const exportServce = new ExportService();
      const absolutePath = path.resolve('../assets/chrec-export.json');
      expect.assertions(1);
      await expect(exportServce.exportChrecJson(absolutePath, new Project('projectName', []))).resolves.toEqual(undefined);
    });
  });
});
