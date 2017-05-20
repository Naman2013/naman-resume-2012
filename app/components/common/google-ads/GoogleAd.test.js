import React from 'react';
import { shallow } from 'enzyme';
import GoogleAd from './GoogleAd';

const TEST_DATA = {
  targetAdID: 'advertisement-target',
};

test('a div with the target ad ID is generated', () => {
  const googleAd = shallow(
    <GoogleAd
      targetDivID={TEST_DATA.targetAdID}
    />
  );

  console.log(googleAd);
});
