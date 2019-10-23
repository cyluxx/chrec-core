import { Project } from '../../../model/project';
import { Sequence } from '../../../model/sequence';
import { ProjectTestResult } from '../../../model/test-result/project-test-result';

describe('Project', () => {
  describe('addSequence', () => {
    test('when Sequence s, then return list of Sequences with s appended to the end', () => {
      const project = new Project('foo', [new Sequence('bar', [])], []);
      project.addSequence(new Sequence('s', []));

      expect(project.sequences).toEqual(
        [new Sequence('bar', []), new Sequence('s', [])]
      );
    })
  })
});

describe('Project', () => {
  describe('addTestResult', () => {
    test('when ProjectTestResult p, then return list of ProjectTestResults with p appended to the end', () => {
      const date = new Date();
      const project = new Project('foo', [], [new ProjectTestResult(date, [])]);
      const dateP = new Date();
      project.addChildTestResult(new ProjectTestResult(dateP, []));

      expect(project.childTestResults).toEqual(
        [new ProjectTestResult(date, []), new ProjectTestResult(dateP, [])]
      );
    })
  })
});