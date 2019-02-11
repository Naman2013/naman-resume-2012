import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OBJECT_HOW_BIG } from '../../../services/objects';
import Request from '../../../components/common/network/Request';
import { HowBigModule } from '../../../components/telescope-details/v4-modules/how-big-module';

import style from './ObjectHowBig.style';


class ObjectHowBig extends Component {
  state = {}

  render() {
    const { objectId } = this.props;

    return (
      <Request
        serviceURL={OBJECT_HOW_BIG}
        requestBody={{ objectId }}
        withoutUser
        render={({
          fetchingContent,
          serviceResponse: { howBigData },
        }) => (
          <div className="root">
            {!fetchingContent && (
              <HowBigModule
                referenceObjectScale={howBigData.referenceObjectScale}
                domain={howBigData.domain}
                targetObjectScale={howBigData.targetObjectScale}
                targetObjectURL={howBigData.targetImageURL}
                targetObjectName={howBigData.targetTitleText}
              />
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
