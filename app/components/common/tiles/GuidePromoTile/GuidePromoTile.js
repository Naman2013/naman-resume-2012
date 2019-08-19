import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericButton from '../../../common/style/buttons/Button';
import { browserHistory } from 'react-router';
import { plus, info } from '../../../../styles/variables/iconURLs';
import styles from './GuidePromoTile.styles';

const { string, boolean} = PropTypes;

class GuidePromoTile extends Component {
  static propTypes = {
    icon: string.isRequired,
    title: string.isRequired,
    buttonText: string.isRequired,
    showIcon: boolean,
    showInfoIcon: boolean,
  };

  static defaultProps = {
      showIcon: false,
      showInfoIcon: false,
  }

  render() {
    const { icon, title, buttonText, showIcon, showInfoIcon, guideURL } = this.props;

    return (
      <div className="guide-promo-tile-root">
        <img className="icon" src={icon} />
        <div className="guide-info">
          <h4 className="title">{title}</h4>

          <div className="actions">
            <GenericButton
            onClickEvent={() => { browserHistory.push(guideURL) }}
            text={buttonText} />
            {showIcon && <GenericButton icon={plus} />}
            {showInfoIcon && <GenericButton icon={info} />}
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export { GuidePromoTile };
