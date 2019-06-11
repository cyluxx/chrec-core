import { ModelFactory } from '../../factory/model.factory';
import { Action } from '../../model/action/action';
import { Back } from '../../model/action/back';
import { Forward } from '../../model/action/forward';
import { GoTo } from '../../model/action/go-to';
import { Refresh } from '../../model/action/refresh';
import { Project } from '../../model/project';
import { Sequence } from '../../model/sequence';

test('Model is build properly from JSON', () => {
  const modelFactory = new ModelFactory();
  const jsonString = `{
      "name":"acp Project Name",
      "sequences":[
        {
          "name":"Test Sequence",
          "actions":[
            {
              "className":"GoTo",
              "image":"",
              "url":"https://www.example.com"
            },
            {
              "className":"GoTo",
              "image":"",
              "url":"https://www.github.com"
            },
            {
              "className":"Refresh",
              "image":""
            },
            {
              "className":"Back",
              "image":""
            },
            {
              "className":"Forward",
              "image":""
            }
          ],
          "sequenceTestResults":[]
        }
      ],
      "projectTestResults":[]
    }`;
  const parsedJson = JSON.parse(jsonString);
  const actions: Action[] = [];
  actions.push(new GoTo('', 'https://www.example.com'));
  actions.push(new GoTo('', 'https://www.github.com'));
  actions.push(new Refresh(''));
  actions.push(new Back(''));
  actions.push(new Forward(''));
  const sequence: Sequence = new Sequence('Test Sequence', actions);
  const project = new Project('acp Project Name', [sequence], []);

  expect(modelFactory.projectFromChrecJson(parsedJson)).toEqual(project);
});
