import React from 'react';
import { Enum } from 'enumify';
import TextOutput from '../modules/text-output';
import QAMulti from '../modules/qa-multi';

import {
  OUTPUT_PANEL,
  GET_QA_MULTI,
} from 'services/quests';

const TEXT_OUTPUT = 'textoutput';
const QA_MULTI = 'qamultiplechoice';

const MOCK_QA_MULTI = {
  activityTitle: 'Make Some Choices!',
  activityInstructions: 'There are several parts to this step.',
  activityPrompt: 'Choose the best answer',
  correctText: 'correct',
  incorrectText: 'incorrect',
  questionCount: 2,
  questionList: [
    {
      questionTitle: 'I. Long Days Night',
      questionInstructions: 'Can you remember the names of Gas Giant planets in the Solar System',
      options: [
        {
          optionIdLabel: 'A',
          label: 'The Solar System',
          value: 'solar-system',
          isCorrect: false,
        },
        {
          optionIdLabel: 'B',
          label: 'The Local Group of Galaxies',
          value: 'local-group',
          isCorrect: false,
        },
        {
          optionIdLabel: 'C',
          label: 'The Deep Space',
          value: 'deep-space',
          isCorrect: true,
        },
      ]
    }
  ],

}

class Modules extends Enum {}
Modules.initEnum({
  [TEXT_OUTPUT]: {
    render: props => (
      <TextOutput
        {...props}
      />
    ),
    apiEndpoint: OUTPUT_PANEL,
    model: {
      name: 'OUTPUT_PANEL',
      model: resp => ({
        panel: resp.panelList[0],
      }),
    },
  },
  [QA_MULTI]: {
    render: props => (
      <QAMulti
        {...props}
      />
    ),
    apiEndpoint: GET_QA_MULTI,
    model: {
      name: 'QA_MULTI',
      model: resp => ({
        // ...resp,
        ...MOCK_QA_MULTI,
      }),
    },
  },
});

export default Modules;
