import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericButton from '../../../common/style/buttons/Button';
import { plus, info } from '../../../../styles/variables/iconURLs';
import styles from './GuidePromoTile.styles';

const { string } = PropTypes;

class GuidePromoTile extends Component {
  static propTypes = {
    icon: string.isRequired,
    title: string.isRequired,
    buttonText: string.isRequired,
  };

  render() {
    const { icon, title, buttonText } = this.props;

    return (
      <div className="guide-promo-tile-root">
        <img className="icon" src={icon} />
        <div className="guide-info">
          <h4 className="title">{title}</h4>

          <div className="actions">
            <GenericButton text={buttonText} />
            <GenericButton icon={plus} />
            <GenericButton icon={info} />
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export { GuidePromoTile };
