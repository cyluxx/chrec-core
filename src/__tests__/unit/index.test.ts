import { instance, mock, verify, when } from 'ts-mockito';
import { Core } from '../../index';
import { Project } from '../../model/project';
import { Settings } from '../../model/settings';

describe('Core', () => {
  describe('testProject', () => {
    test('verify project test', async () => {
      const mockedSettings: Settings = mock(Settings);
      const settings = instance(mockedSettings);

      const mockedProject: Project = mock(Project);
      when(mockedProject.test(mockedSettings)).thenResolve();
      const project = instance(mockedProject);

      const core = new Core();
      core.testProject(project, settings);

      verify(mockedProject.test(settings)).called();
    });
  });
});
