import { addLocaleData } from 'react-intl';

import enLocaleData from 'react-intl/locale-data/en';

export const localeData = [enLocaleData];

export const addAppLocaleData = () => localeData.map(locale => addLocaleData(locale));
