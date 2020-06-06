/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AlbumList from './src/components/AlbumList';
import PhotoList from './src/components/PhotoList';
import PhotoComment from './src/components/PhotoComment';
import {I18nManager, ScrollView, View} from "react-native";

import * as RNLocalize from 'react-native-localize';
import i18n from "i18n-js";
import {translate} from "./translation";

const Stack = createStackNavigator();

const translationGetters = {
    ar: () => require("./src/translations/ar.json"),
    en: () => require("./src/translations/en.json")
};

const setI18nConfig = () => {
    const fallback = {languageTag: "en", isRTL: false};
    const {languageTag, isRTL} = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;

    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = {[languageTag]: translationGetters[languageTag]()};
    i18n.locale = languageTag;
};

// Create a component
const App = () => {
    setI18nConfig()
    //
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="albumList"
                    component={AlbumList}
                    options={{title: translate('MENU_ALBUM')}}
                />
                <Stack.Screen
                    name="photoList"
                    component={PhotoList}
                    options={{title: translate('MENU_PHOTO')}}
                />
                <Stack.Screen
                    name="photoComment"
                    component={PhotoComment}
                    options={{title: translate('MENU_COMMENT')}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App