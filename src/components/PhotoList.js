import React, {Component, useState, useEffect, useRef} from 'react';
import {ScrollView, SortableList, Text, View, Button} from 'react-native';
import {translate} from "../../translation";
import axios from 'axios';
import PhotoDetail from './PhotoDetail';
import Card from "./Card";
import CardSection from "./CardSection";
import PickerModal from 'react-native-picker-modal-view';

const PhotoList = props => {
    const [photoState, setPhoto] = useState({photos: null});
    const isCancelled = useRef(false);

    const [albumState, setAlbum] = useState()

    const sorterStrategy = {
        Name: {
            Asc: (a, b) => a.title > b.title,
            Desc: (a, b) => a.title < b.title
        },
        Upload: {
            Asc: (a, b) => a.dateupload > b.dateupload,
            Desc: (a, b) => a.dateupload < b.dateupload
        }
    }
    const sortedType = [
        {
            Name: "Name",
            Value: "Name",
            Code: "N",
            Id: 1
        },
        {
            Name: "Upload",
            Value: "Upload",
            Code: "U",
            Id: 2
        }]
    const sortedValue = [
        {
            "Name": "Asc",
            "Value": "Asc",
            "Code": "A",
            "Id": 1
        },
        {
            "Name": "Desc",
            "Value": "Desc",
            "Code": "D",
            "Id": 2
        }]
    const [sorter, setSorter] = useState({type: sortedType[0].Name, value: sortedValue[0].Name})

    useEffect(() => {
        callFlickr()

        return () => {
            isCancelled.current = true
        };
    });

    let onSelectedType = selected => {
        sorter.type = selected.Value
        setSorter(sorter)
        sortAlbum()
    }

    let onSelectedValue = selected => {
        sorter.value = selected.Value
        setSorter(sorter)
        sortAlbum()
    }

    let callFlickr = () => {
        axios
            .get(
                `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${
                    props.route.params.albumId
                }&extras=date_upload&user_id=137290658%40N08&format=json&nojsoncallback=1`,
            )
            .then(response => {
                if (!isCancelled.current) {
                    setPhoto({photos: response.data.photoset.photo})
                }
            });
    };

    let sortAlbum = () => {
        let photos = [].concat(
            photoState
                .photos)
            .sort(sorterStrategy[sorter.type][sorter.value])
        setPhoto({photos: photos})
    }

    let renderAlbum = () => {
        return photoState.photos
            .map(photo => (
                <PhotoDetail
                    navigation={props.navigation}
                    key={photo.title}
                    title={photo.title}
                    dateUpload={photo.dateupload}
                    imageId={photo.id}
                    imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${
                        photo.id
                    }_${photo.secret}.jpg`}
                />
            ))
    };

    if (!photoState.photos) {
        return (
            <View style={{flex: 1}}>
                <Text>{translate('LOADING')}</Text>
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView>
                <Card>
                    <CardSection>
                        <PickerModal
                            renderSelectView={(disabled, selected, showModal) =>
                                <Button disabled={disabled} title={sorter.type} onPress={showModal}/>
                            }
                            onBackButtonPressed={() => {
                            }}
                            onClosed={() => {
                            }}
                            onSelected={onSelectedType}
                            items={sortedType}
                            sortingLanguage={'tr'}
                            //selected={sorter}
                            autoSort={false}
                            showToTopButton={false}
                            showAlphabeticalIndex={false}
                            autoGenerateAlphabeticalIndex={false}
                            requireSelection={true}
                            //selectPlaceholderText={'Choose one...'}
                            //onEndReached={() => console.log('list ended...')}
                            //searchPlaceholderText={'Search...'}
                        />
                        <PickerModal
                            renderSelectView={(disabled, selected, showModal) =>
                                <Button disabled={disabled} title={sorter.value} onPress={showModal}/>
                            }
                            onBackButtonPressed={() => {
                            }}
                            onClosed={() => {
                            }}
                            onSelected={onSelectedValue}
                            items={sortedValue}
                            sortingLanguage={'tr'}
                            autoSort={false}
                            showToTopButton={false}
                            showAlphabeticalIndex={false}
                            autoGenerateAlphabeticalIndex={false}
                            requireSelection={true}
                        />
                    </CardSection>
                </Card>
                {renderAlbum()}
            </ScrollView>
        </View>
    );
};

export default PhotoList;
