import { instance, mock, verify } from 'ts-mockito';
import { Project } from '../../../model/project';
import { Sequence } from '../../../model/sequence';
import { Settings } from '../../../model/settings';

describe('Project', () => {
  describe('addSequence', () => {
    test('when Sequence s, then return list of Sequences with s appended to the end', () => {
      const project = new Project('foo', [new Sequence('bar', [])]);
      project.addSequence(new Sequence('s', []));

      expect(project.sequences).toEqual(
        [new Sequence('bar', []), new Sequence('s', [])]
      );
    })
  })

  describe('test', () => {
    test('verify squences are tested', async () => {
      const mockedSettings: Settings = mock(Settings);
      const settings = instance(mockedSettings);

      const mockedSequence: Sequence = mock(Sequence);
      const sequence = instance(mockedSequence);

      const project = new Project('foo', [sequence]);

      project.test(settings);

      verify(mockedSequence.test(settings)).called();
    })
  })
});