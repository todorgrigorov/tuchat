import React, { Component } from 'react';
import { View, ActivityIndicator, TouchableOpacity, StatusBar, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import path from 'react-native-path';

import ScreenHeader from "../../common/screen-header/index";
import ScreenLayout from "../../common/screen-layout/index";
import colors from '../../../ui/colors';
import styles from './styles';
import http from '../../../services/http';
import apiRoutes from '../../../config/api-routes';
import settingsProvider from '../../../services/settings-provider';
import settings from '../../../config/settings';

const config = {
};

export default class CameraScreen extends Component {
    state = {
        photoTaken: false,
        statusBarVisible: false
    }

    render() {
        return (
            <ScreenLayout>
                <StatusBar hidden={this.state.statusBarVisible} />

                {!this.state.photoTaken &&
                    <RNCamera
                        style={styles.camera}
                        type={RNCamera.Constants.Type.front}
                        permissionDialogTitle='Allow camera usage'
                        permissionDialogMessage='Your permission is required in order to take photos with the camera'>
                        {
                            ({ camera, status }) => {
                                if (status !== RNCamera.Constants.CameraStatus.READY) {
                                    return (
                                        <View style={styles.buttonsContainer}>
                                            <ActivityIndicator size='large' />
                                        </View>
                                    );
                                } else return (
                                    <View style={styles.buttonsContainer}>
                                        {!this.state.photoTaken &&
                                            <TouchableOpacity
                                                style={styles.centerButtonContainer}
                                                onPress={() => this.onTakePicture(camera)}>
                                                <Icon
                                                    raised
                                                    type='font-awesome'
                                                    name='camera'
                                                    size={35}
                                                    color={colors.accent} />
                                            </TouchableOpacity>}
                                    </View>
                                );
                            }
                        }

                    </RNCamera>}

                {this.state.photoTaken &&
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' />
                    </View>}
            </ScreenLayout >
        );
    }

    async onTakePicture(camera) {
        this.setState({
            photoTaken: true
        });

        const data = await camera.takePictureAsync({
            quality: .1,
            base64: true,
            mirrorImage: true
        });

        const result = await http.request(
            apiRoutes.ATTACHMENTS_UPLOAD_SINGLE,
            'POST', {
                name: path.basename(data.uri),
                base64: data.base64,
            });
        await settingsProvider.set(settings.PHOTO_ID, result.data.id);

        this.setState({
            statusBarVisible: true
        });
        this.props.navigation.state.params.onChange(result.data.id);
        this.props.navigation.goBack();

        await http.request(
            apiRoutes.USERS_PHOTO,
            'POST', {
                id: await settingsProvider.get(settings.ID),
                photoId: result.data.id
            });
    }
}