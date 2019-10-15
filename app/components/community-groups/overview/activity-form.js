import { prepareThread } from 'app/services/discussions/prepare-thread';
import { dropShadowContainer } from 'app/styles/mixins/utilities';
import { screenLarge, screenMedium } from 'app/styles/variables/breakpoints';
import { romance } from 'app/styles/variables/colors_tiles_v4';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import FullActivityForm from './full-activity-form';
import SmallActivityForm from './small-activity-form';

const { bool, number, shape, string } = PropTypes;

@withTranslation()
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
    showInfo: false,
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

  toggleInfo = e => {
    e.preventDefault();

    this.setState(state => ({
      showInfo: !state.showInfo,
    }));
  };

  render() {
    const { isDesktop, topicId, forumId, placeholder, t } = this.props;

    const { uuid, showInfo } = this.state;

    const formPlaceholder = placeholder || `${t('Clubs.WriteSomething')}...`;

    return (
      <div className="root">
        {isDesktop ? (
          <FullActivityForm
            {...this.props}
            uuid={uuid}
            placeholder={formPlaceholder}
            toggleInfo={this.toggleInfo}
            showInfo={showInfo}
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

export default ActivityForm;
