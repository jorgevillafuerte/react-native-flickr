import React, {useState, useEffect, useRef} from 'react';
import CommentDetail from "./CommentDetail";
import {translate} from "../../translation";
import axios from 'axios';
import {ScrollView, Text, View} from "react-native";

const PhotoComment = props => {
    const [commentState, setComment] = useState({comments: null})
    const isCancelled = useRef(false);

    useEffect(() => {
            getComments()

            return () => {
                isCancelled.current = true;
            }
        }
    )

    let getComments = () => {
        axios
            .get(
                `https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photo_id=${
                    props.route.params.imageId
                }&format=json&nojsoncallback=1`,
            )
            .then(response => {
                    if (!isCancelled.current) {
                        setComment({comments: response.data.comments.comment});
                    }
                }
            )
    }

    let renderComments = () => {
        return commentState.comments.map(comment => (
            <CommentDetail
                key={comment.id}
                album={comment.album}
                author={comment.author}
                authorname={comment.authorname}
                content={comment._content}

                datecreate={comment.datecreate}
                id={comment.id}
            />
        ));
    }

    if (!commentState.comments) {
        return (
            <View style={{flex: 1}}>
                <Text>{translate('LOADING')}</Text>
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView>{renderComments()}</ScrollView>
        </View>
    )
}

export default PhotoComment