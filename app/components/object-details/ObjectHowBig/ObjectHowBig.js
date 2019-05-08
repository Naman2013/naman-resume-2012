import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OBJECT_HOW_BIG } from '../../../services/objects';
import Request from '../../common/network/Request';
import { HowBigModule } from '../../../modules/telescope/components/old/how-big-module';

import style from './ObjectHowBig.style';

class ObjectHowBig extends Component {
  state = {};

  render() {
    const { objectId } = this.props;

    return (
      <Request
        serviceURL={OBJECT_HOW_BIG}
        requestBody={{ objectId }}
        withoutUser
        render={({ fetchingContent, serviceResponse: resp }) => (
          <div className="root">
            {!fetchingContent && (
              <HowBigModule {...resp} {...resp.howBigData} />
            )}
            <style jsx>{style}</style>
          </div>
        )}
      />
    );
  }
}

ObjectHowBig.propTypes = {
  objectId: PropTypes.string.isRequired,
};

export default ObjectHowBig;
