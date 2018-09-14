import React from 'react';
import { storiesOf } from '@storybook/react';
import ObjectProfile from '../app/components/object-details/ObjectProfile';

storiesOf('ObjectProfile', module)
  .add('Default', () => (
    <ObjectProfile
      scienceName="Mars"
      objectSpecs={{
        ra: 1,
        dec: 2,
        magnitude: 100,
      }}
      visibilitySeason={{
        title: 'Sample visibility',
        observatories: [<p key="sample-test-0">Sample Test</p>, <p key="sample-test-1">Sample Test</p>],
      }}
      midnightCulmination={{
        label: 'Sample label',
        text: 'Sample text',
        description: 'And this is a description',
      }}
      bestTelescope={{
        label: 'Best telescopes to use',
        list: [
          { title: 'Canary Three', description: 'Heres why, fusce vehicula dolor arcu, sit amet blait dolor mollis nec. Donec viverra eleifend lacus, vitae maecenas eu varius risus, eu aliquet arcu.', linkURL: '#' },
          { title: 'Canary Five', description: String.prototype.split.call('Heres why, fusce vehicula dolor arcu, sit amet blait dolor mollis nec. Donec viverra eleifend lacus, vitae maecenas eu varius risus, eu aliquet arcu.', '').reverse().join(''), linkURL: '#' },
        ],
      }}
    />
  ));
