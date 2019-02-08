import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import BurnhamsCornerLarge from './BurnhamsCornerLarge';
import BurnhamsCornerSmall from './BurnhamsCornerSmall';

const MAX_LENGTH = 210;

function trimmeString(string, maxLength) {
  if (string.length <= maxLength) {
    return {
      trimmedString: string,
      needToShowMore: false,
    };
  }

  let trimmedString = string.substr(0, MAX_LENGTH);
  trimmedString = `${trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))} ...`;

  return {
    needToShowMore: true,
    trimmedString,
  };
}

class BurnhamsCorner extends Component {
  state = {
    showMore: false,
  }

  toggleReadMore = () => this.setState(prevState => ({ showMore: !prevState.showMore }));

  render() {
    const { content } = this.props;
    const { showMore } = this.state;

    const { trimmedString, needToShowMore } = trimmeString(content, MAX_LENGTH);

    const contentToShow = showMore ? content : trimmedString;

    return (
      <Fragment>
        <DisplayAtBreakpoint screenSmall>
          <BurnhamsCornerSmall
            {...this.props}
            needToShowMore={needToShowMore}
            showMore={showMore}
            toggleReadMore={this.toggleReadMore}
            content={contentToShow}
          />
        </DisplayAtBreakpoint>

        <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
          <BurnhamsCornerLarge
            {...this.props}
            needToShowMore={needToShowMore}
            showMore={showMore}
            toggleReadMore={this.toggleReadMore}
            content={contentToShow}
          />
        </DisplayAtBreakpoint>
      </Fragment>
    );
  }
}
BurnhamsCorner.propTypes = {
  objectTitle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  hasLink: PropTypes.bool.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkURL: PropTypes.string.isRequired,
};


export default BurnhamsCorner;
