/***********************************
 * V4 Community Group Activity Form
 *
 *
 *
 ***********************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import FullActivityForm from './full-activity-form';
import SmallActivityForm from './small-activity-form';
import { prepareThread } from 'app/services/discussions/prepare-thread';
import {
  romance,
  seashell,
  shadows,
} from 'app/styles/variables/colors_tiles_v4';
import { secondaryFont } from 'app/styles/variables/fonts';
import { dropShadowContainer } from 'app/styles/mixins/utilities';
import { screenLarge, screenMedium } from 'app/styles/variables/breakpoints';
import messages from './activity-form.messages';

const { bool, number, shape, string } = PropTypes;

class ActivityForm extends Component {
  static propTypes = {
    topicId: number,
    forumId: number,
    canPost: bool,
    placeholder: string,
    user: shape({
      at: string,
      token: string,
      cid: string,
    }).isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    topicId: 0,
    forumId: 0,
    canPost: false,
    placeholder: '',
    user: {
      at: '',
      token: '',
      cid: '',
    },
  };

  state = {
    uuid: null,
    showSmallActivityForm: false,
  };

  componentDidMount() {
    const { user } = this.props;

    prepareThread({
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then(res => {
      if (!res.data.apiError) {
        this.setState({
          uuid: res.data.postUUID,
        });
      }
    });
  }

  render() {
    const { isDesktop, topicId, forumId, intl, placeholder } = this.props;

    const { uuid } = this.state;

    const formPlaceholder =
      placeholder || `${intl.formatMessage(messages.WriteSomething)}...`;

    return (
      <div className="root">
        {isDesktop ? (
          <FullActivityForm
            {...this.props}
            uuid={uuid}
            placeholder={formPlaceholder}
          />
        ) : (
          <SmallActivityForm
            {...this.props}
            placeholder={formPlaceholder}
            uuid={uuid}
          />
        )}
        <style jsx>
          {`
            .root {
              width: 100%;
              margin: 10px 0;
              background-color: ${romance};
              ${dropShadowContainer}
            }

            @media ${screenMedium} {
              .root {
                margin: 0 auto;
                width: 620px;
              }
            }

            @media ${screenLarge} {
              .root {
                width: 100%;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

export default injectIntl(ActivityForm);
