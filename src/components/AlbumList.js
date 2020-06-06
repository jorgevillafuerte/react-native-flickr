import React, {Component, useState, useEffect, useRef} from 'react';
import {ScrollView, Text, View} from 'react-native';
import axios from 'axios';
import {translate} from "../../translation";
import AlbumDetail from './AlbumDetail';

const AlbumList = props => {
    const [photosetState, setPhotoset] = useState({photoset: null});
    const isCancelled = useRef(false);

    useEffect(() => {
        callFlickr();

        return () => {
            isCancelled.current = true;
        };
    });

    let callFlickr = () => {
        axios
            .get(
                'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
            )
            .then(response => {
                if (!isCancelled.current) {
                    setPhotoset({photoset: response.data.photosets.photoset});
                }
            });
    };

    let renderAlbums = () => {
        return photosetState.photoset.map(album => (
            <AlbumDetail
                navigation={props.navigation}
                key={album.id}
                title={album.title._content}
                albumId={album.id}
            />
        ));
    };

    if (!photosetState.photoset) {
        return <Text>{translate('LOADING')}</Text>;
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView>{renderAlbums()}</ScrollView>
        </View>
    );
};

export default AlbumList;
