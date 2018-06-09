import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Easing, Image, CameraRoll } from 'react-native';
import Modal from 'react-native-modalbox';
import _ from 'lodash';

import ScreenHeader from "../../common/screen-header/index";
import ScreenLayout from "../../common/screen-layout/index";
import colors from '../../../ui/colors';
import styles from './styles';
import http from '../../../services/http';
import apiRoutes from '../../../config/api-routes';
import settingsProvider from '../../../services/settings-provider';
import settings from '../../../config/settings';

const config = {
    EASING_DURATION: 250,
    PAGE: 7
};

export default class GalleryModal extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        isOpen: true,
        photos: []
    }

    async componentDidMount() {
        await this.loadPage();
    }

    render() {
        return (
            <Modal
                style={styles.modal}
                isOpen={this.state.isOpen}
                easing={Easing.quad}
                animationDuration={config.EASING_DURATION}
                onClosed={this.props.onClosed.bind(this)}
                position='bottom'
                entry='bottom'
                coverScreen={false}>

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={200}
                    onScroll={async ({ nativeEvent }) => {
                        if (this.isCloseToRight(nativeEvent)) {
                            await this.loadPage();
                        }
                    }}>

                    {this.state.photos.map(({ node }, i) => {
                        return (
                            <TouchableOpacity
                                style={styles.imageContainer}
                                key={i}
                                onPress={this.onImageSelected.bind(this, node.image)}>
                                <Image
                                    resizeMode='cover'
                                    style={this.getImageStyle(node.image)}
                                    source={{ uri: node.image.uri }} />
                            </TouchableOpacity>
                        );
                    })}

                </ScrollView>

            </Modal>
        );
    }

    getImageStyle(image) {
        const isPortrait = image.height > image.width;
        if (isPortrait) {
            return {
                height: 150,
                width: 100
            }
        } else {
            return {
                height: 150,
                width: 200
            }
        }
    }

    async loadPage() {
        if (!this.pageCursor || this.pageCursor.has_next_page) {
            const cameraRoll = await CameraRoll.getPhotos({
                first: config.PAGE,
                after: this.pageCursor ? this.pageCursor.end_cursor : undefined,
                assetType: 'Photos',
            });

            this.pageCursor = cameraRoll.page_info;

            this.setState(previousState => {
                const newPhotos = previousState.photos;
                for (const photo of cameraRoll.edges) {
                    const added = false;
                    for (const p of newPhotos) {
                        if (p.node.timestamp === photo.node.timestamp) {
                            added = true;
                            break;
                        }
                    }

                    if (!added) {
                        newPhotos.push(photo);
                    }
                }

                return {
                    photos: newPhotos
                }
            });
        }
    }

    isCloseToRight({ layoutMeasurement, contentOffset, contentSize }) {
        const paddingToRight = layoutMeasurement.width / 2;
        return layoutMeasurement.width + contentOffset.x >= contentSize.width - paddingToRight;
    }

    onImageSelected(image) {
        this.setState({
            isOpen: false
        });

        this.props.onImageSelected(image);
    }
}