import React from 'react';
import {Text, View, Image, Linking} from 'react-native';
import {translate} from "../../translation";
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const AlbumDetail = ({navigation, title, albumId}) => {
    const {headerContentStyle, headerTextStyle} = styles;

    return (
        <Card>
            <CardSection>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{title}</Text>
                </View>
            </CardSection>

            <CardSection>
                <Button
                    onPress={() => navigation.navigate('photoList', {albumId: albumId})}>
                    {translate('BUTTON_ALBUM')}
                </Button>
            </CardSection>
        </Card>
    );
};

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    headerTextStyle: {
        fontSize: 18,
    },
    thumbnailStyle: {
        height: 50,
        width: 50,
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    }
};

export default AlbumDetail;
