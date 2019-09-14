import { instance, mock, when } from 'ts-mockito';
import { Core } from '../../index';
import { Project } from '../../model/project';
import { Settings } from '../../model/settings';
import { ProjectTestResult } from '../../model/test-result/project-test-result';
import { ReplayService } from '../../service/replay.service';

describe('Core', () => {
  describe('addProjectTest', () => {
    test('returns project with new TestResult', async () => {
      expect.assertions(2);

      const project = new Project('foo', [], []);
      const settings = new Settings('foo', []);
      const projectTestResult = new ProjectTestResult(new Date(), []);
      let mockedReplayService = mock(ReplayService);
      when(mockedReplayService.testProject(project, settings)).thenResolve(projectTestResult);

      mockedReplayService = instance(mockedReplayService);

      const core = new Core();
      core.replayService = mockedReplayService;

      const result = await core.addProjectTest(project, settings);

      expect(result).toEqual(project);
      expect(result.projectTestResults).toEqual([projectTestResult]);
    });
  });
});
