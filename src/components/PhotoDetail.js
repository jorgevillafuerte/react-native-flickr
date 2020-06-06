import React from 'react';
import {Text, View, Image, Linking} from 'react-native';
import {translate} from "../../translation";
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const PhotoDetail = ({title, imageId, imageUrl, navigation, dateUpload}) => {
    const {
        thumbnailStyle,
        thumbnailContainerStyle,
        headerContentStyle,
        headerTextStyle,
        imageStyle
    } = styles;

    let getDate = dateUpload => {
        let date = new Date(0)
        date.setUTCSeconds(dateUpload)

        let dd = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        let hs = date.getHours()
        let min = date.getMinutes()

        return `${dd}/${month}/${year} ${hs}:${min}`
    }

    return (
        <Card>
            <CardSection>
                <View style={thumbnailContainerStyle}>
                    <Image
                        style={thumbnailStyle}
                        source={{uri: imageUrl}}
                    />
                </View>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{title}</Text>
                </View>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{getDate(dateUpload)}</Text>
                </View>
            </CardSection>

            <CardSection>
                <Image
                    style={imageStyle}
                    source={{uri: imageUrl}}
                />
            </CardSection>

            <CardSection>
                <Button onPress={() => Linking.openURL(imageUrl)}>
                    {translate('BUTTON_PHOTO')}
                </Button>
                <Button onPress={() => navigation.navigate('photoComment', {imageId: imageId})}>
                    {translate('BUTTON_COMMENT')}
                </Button>
            </CardSection>
        </Card>
    );
};

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    }
};

export default PhotoDetail;
