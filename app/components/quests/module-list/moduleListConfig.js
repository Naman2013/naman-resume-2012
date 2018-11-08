import React from 'react';
import { Enum } from 'enumify';
import TextOutput from '../modules/text-output';

import {
  OUTPUT_PANEL,
} from 'services/quests';

const TEXT_OUTPUT = 'textoutput';


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
});

export default Modules;
