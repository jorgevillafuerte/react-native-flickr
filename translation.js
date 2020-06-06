import i18n from "i18n-js";
import {I18nManager} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import memoize from 'lodash.memoize';

const t = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const translate = t;
