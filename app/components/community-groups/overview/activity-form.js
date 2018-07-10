/***********************************
* V4 Community Group Activity Form
*
*
*
***********************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import FullActivityForm from './full-activity-form';
import SmallActivityForm from './small-activity-form';
import { prepareThread } from 'services/discussions/prepare-thread';
import {
  romance,
  seashell,
  shadows,
} from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';
import { dropShadowContainer } from 'styles/mixins/utilities';
import { screenLarge, screenMedium } from 'styles/variables/breakpoints';


const {
  bool,
  number,
  string,
} = PropTypes;

class ActivityForm extends Component {
  static propTypes = {
    topicId: number,
    forumId: number,
    canPost: bool,
    placeholder: string,
  }
  static defaultProps = {
    topicId: 0,
    forumId: 0,
    canPost: false,
    placeholder: 'Write something...',
  }

  state = {
    uuid: null,
    showSmallActivityForm: false,
  }

  componentDidMount() {
    const {
      user,
    } = this.props;

    prepareThread({
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then((res) => {
      if (!res.data.apiError) {
        this.setState({
          uuid: res.data.postUUID,
        })
      }
    });
  }

  render () {
    const { props, state } = this
    const {
      placeholder,
      isDesktop,
      topicId,
      forumId,
    } = props;

    const {
      uuid,
    } = state;

    return (
      <div className="root">
        {isDesktop ? <FullActivityForm {...props} uuid={uuid} /> :
        <SmallActivityForm
          {...props}
          uuid={uuid}
        />}
        <style jsx>{`
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

        `}</style>
      </div>
    )
  }
}

export default ActivityForm;
