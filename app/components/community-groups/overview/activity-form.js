/***********************************
* V4 Community Group Activity Form
*
*
*
***********************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import DesktopActivityForm from './activity-form-desktop';
import { prepareThread } from 'services/discussions/prepare-thread';
import { astronaut, romance } from 'styles/variables/colors_tiles_v4';
import { dropShadowContainer } from 'styles/mixins/utilities';
import { screenLarge } from 'styles/variables/breakpoints';


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
    placeholder: 'Tell us something...',
  }

  state = {
    uuid: null,
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
      isDesktop,
    } = props;

    const {
      uuid,
    } = state;

    return (
      <div className="root">
        {isDesktop ? <DesktopActivityForm {...props} uuid={uuid} /> : null}
        <style jsx>{`
          .root {
            width: 100%;
            margin: 10px 0;
            background-color: ${romance};
            ${dropShadowContainer}
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
