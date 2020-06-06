import React, {useState, useEffect, useRef} from 'react'
import CardSection from "./CardSection";
import {Image, Text, View} from "react-native";
import {translate} from "../../translation";
import Card from "./Card";
import axios from "axios";

const CommentDetail = ({authorname, content, author}) => {
    const {
        thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
    } = styles;
    const isCancelled = useRef(false);
    const [userState, setUser] = useState({person: null});

    useEffect(() => {
        getUser();

        return () => {
            isCancelled.current = true;
        };
    });

    let getUser = () => {
        axios
            .get(
                `https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=${
                    author
                }&format=json&nojsoncallback=1`,
            )
            .then(response => {
                if (!isCancelled.current) {
                    setUser({person: response.data.person});
                }
            });
    };

    let getUserIcon = ({iconFarm, iconServer, userID}) => {
        if (iconServer > 0) {
            return `https://farm${iconFarm}.staticflickr.com/${iconServer}/buddyicons/${userID}.jpg`
        }
        return "https://www.flickr.com/images/buddyicon.gif"
    }

    if (!userState.person) {
        return (
            <Card>
                <CardSection>
                    <View style={thumbnailContainerStyle}>
                        <Text style={thumbnailContainerStyle}>{translate('LOADING')}</Text>
                    </View>
                </CardSection>
            </Card>
        );
    }

    return (
        <Card>
            <CardSection>
                <View style={thumbnailContainerStyle}>
                    <Image
                        style={thumbnailStyle}
                        source={{uri: getUserIcon(userState.person.iconfarm, userState.person.iconserver, userState.person.nsid)}}
                    />
                </View>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{authorname}</Text>
                </View>
            </CardSection>

            <CardSection>
                <View style={thumbnailContainerStyle}>
                    <Text style={thumbnailContainerStyle}>{content}</Text>
                </View>
            </CardSection>
        </Card>
    )
}

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
    }
};

export default CommentDetail