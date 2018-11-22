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
        panel: resp.panelList[0],
      }),
    },
  },
});

export default Modules;
