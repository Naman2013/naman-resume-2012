/** ***********
* V4 I18n provider


**************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { addAppLocaleData } from '../utils/i18n/localeData';
import * as en from '../resources/locales/en';
import localeTypes from '../constants/locale-types';

addAppLocaleData();

class I18nProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  getMessagesByLocale = locale => Object.assign(...Object.values(this.getFolderByLocale(locale)));

  getFolderByLocale = (locale) => {
    switch (locale) {
      case localeTypes.en:
        return en;
      default:
        return en;
    }
  };

  render() {
    const { children } = this.props;
    const locale = 'en';

    return (
      <IntlProvider locale={locale} messages={this.getMessagesByLocale(locale)}>
        {children}
      </IntlProvider>
    );
  }
}

export default I18nProvider;
