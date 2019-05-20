/***********************************
 * V4 Object Detail List populated with info
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { profilePhotoStyle } from 'app/styles/mixins/utilities';
import style from './BootstrappedObjectDetailList.style';

const { bool, shape, string } = PropTypes;

class ObjectDetailList extends Component {
  static propTypes = {
    isDesktop: bool,
    listTitle: string,
    objectDetailList: shape({
      constellation: shape({
        hasIconFlag: bool,
        hasLinkFlag: bool,
        iconUrl: string,
        label: string,
        linkLabel: string,
        linkUrl: string,
        text: string,
        textDetail: string,
        textNote: string,
      }),
      domain: shape({
        hasIconFlag: bool,
        hasLinkFlag: bool,
        iconUrl: string,
        label: string,
        linkLabel: string,
        linkUrl: string,
        text: string,
        textDetail: string,
        textNote: string,
      }),
      name: shape({
        hasIconFlag: bool,
        hasLinkFlag: bool,
        iconUrl: string,
        label: string,
        linkLabel: string,
        linkUrl: string,
        text: string,
        textDetail: string,
        textNote: string,
      }),
    }),
  };

  static defaultProps = {
    isDesktop: true,
    listTitle: '',
    objectDetailList: {
      name: {},
      domain: {},
      constellation: {},
    },
  };

  state = {};

  render() {
    const {
      isDesktop,
      isMobile,
      listTitle,
      objectDetailList,
      Domain,
      ObjectType,
      Constellation,
    } = this.props;
    const profPic = photoUrl =>
      Object.assign(profilePhotoStyle(photoUrl), {
        height: '50px',
        width: '50px',
        backgroundSize: 'cover',
      });

    return (
      <div className="root">
        {!isMobile ? (
          <div className="wide-info-block">
            {ObjectType ? (
              <div className="wide-info-item">
                <div
                  className="wide-info-block-header"
                  dangerouslySetInnerHTML={{ __html: ObjectType.label }}
                />
                <div
                  className="wide-info-block-name"
                  dangerouslySetInnerHTML={{ __html: ObjectType.text }}
                />
              </div>
            ) : null}
            {Domain ? (
              <div className="wide-info-item">
                <div
                  className="wide-info-block-header"
                  dangerouslySetInnerHTML={{ __html: Domain.label }}
                />
                <div
                  className="wide-info-block-name"
                  dangerouslySetInnerHTML={{ __html: Domain.text }}
                />
              </div>
            ) : null}
            {Constellation ? (
              <div className="wide-info-item">
                <div
                  className="wide-info-block-header"
                  dangerouslySetInnerHTML={{ __html: Constellation.label }}
                />
                {Constellation.hasLink ? (
                  <Link
                    className="wide-info-block-name"
                    to={Constellation.linkUrl}
                    dangerouslySetInnerHTML={{ __html: Constellation.text }}
                  />
                ) : (
                  <div
                    className="wide-info-block-name"
                    dangerouslySetInnerHTML={{ __html: Constellation.text }}
                  />
                )}
              </div>
            ) : null}
          </div>
        ) : null}

        <style jsx>{style}</style>
      </div>
    );
  }
}

export default ObjectDetailList;
