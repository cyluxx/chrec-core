import { instance, mock, verify } from 'ts-mockito';
import { Project } from '../../../model/project';
import { Sequence } from '../../../model/sequence';
import { Settings } from '../../../model/settings';

describe('Project', () => {
  describe('addSequence', () => {
    test('when Sequence s, then return list of Sequences with s appended to the end', () => {
      const sequence1 = new Sequence('bar', []);
      const sequence2 = new Sequence('s', []);
      const project = new Project('foo', [sequence1]);
      project.addSequence(sequence2);

      expect(project.sequences).toEqual([sequence1, sequence2]);
    });
  });

  describe('test', () => {
    test('verify squences are tested', async () => {
      const mockedSettings: Settings = mock(Settings);
      const settings = instance(mockedSettings);

      const mockedSequence: Sequence = mock(Sequence);
      const sequence = instance(mockedSequence);

      const project = new Project('foo', [sequence]);

      project.test(settings);

      verify(mockedSequence.test(settings)).called();
    });
  });
});
