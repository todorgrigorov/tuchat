import React, { Component } from 'react';
import { Alert, TextInput, TouchableOpacity, Easing, Image, CameraRoll } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modalbox';

import ScreenHeader from "../../common/screen-header/index";
import ScreenLayout from "../../common/screen-layout/index";
import colors from '../../../ui/colors';
import styles from './styles';
import http from '../../../services/http';
import apiRoutes from '../../../config/api-routes';
import settingsProvider from '../../../services/settings-provider';
import settings from '../../../config/settings';

const config = {
    EASING_DURATION: 200,
    NAME_MAX_LENGTH: 25,
    PURPOSE_MAX_LENGTH: 200
};

export default class AddRoomModal extends Component {
    state = {
        name: '',
        purpose: '',
        isOpen: true,
        buttonDisabled: true,
    }

    render() {
        return (
            <Modal
                style={styles.modal}
                isOpen={this.state.isOpen}
                onOpened={this.onOpened.bind(this)}
                animationDuration={config.EASING_DURATION}
                onClosed={this.props.onClosed.bind(this)}
                position='bottom'
                entry='bottom'
                coverScreen={false}>

                <TextInput
                    ref={(input) => this.nameInput = input}
                    value={this.state.name}
                    placeholder='#name'
                    style={styles.nameInput}
                    onChangeText={this.onChangeName.bind(this)}
                    maxLength={config.NAME_MAX_LENGTH}
                    returnKeyType='next'
                    onSubmitEditing={this.onNameInputSubmit.bind(this)} />

                <TextInput
                    ref={(input) => this.purposeInput = input}
                    value={this.state.purpose}
                    placeholder='purpose of this room'
                    multiline={true}
                    onChangeText={this.onChangePurpose.bind(this)}
                    maxLength={config.PURPOSE_MAX_LENGTH}
                    style={styles.purposeInput} />

                <Button
                    onPress={this.onAddPress.bind(this)}
                    containerViewStyle={styles.button}
                    buttonStyle={{ backgroundColor: colors.accent, }}
                    color={colors.white}
                    title='create'
                    disabled={this.state.buttonDisabled} />

            </Modal>
        );
    }

    onNameInputSubmit() {
        this.purposeInput.focus();
    }

    onOpened() {
        setTimeout(() => {
            this.nameInput.focus();
        }, config.EASING_DURATION + 50);
    }

    onChangeName(name) {
        this.setState({
            name
        });

        if (this.roomNameValid(name)) {
            this.setState({
                buttonDisabled: false
            });
        } else {
            this.setState({
                buttonDisabled: true
            });
        }
    }

    onChangePurpose(purpose) {
        this.setState({
            purpose
        });
    }

    roomNameValid(name) {
        let valid = true;

        if (name && name.match(/[a-zA-Z0-9-_]+$/) && !name.includes(' ')) {
            for (const room of this.props.rooms) {
                if (room.name === name) {
                    valid = false;
                }
            }
        } else {
            valid = false;
        }

        return valid;
    }

    async onAddPress() {
        await http.request(apiRoutes.ROOMS, 'POST', {
            name: this.state.name,
            purpose: this.state.purpose,
            facultyId: await settingsProvider.get(settings.FACULTY_ID),
            specialtyId: await settingsProvider.get(settings.SPECIALTY_ID),
            group: await settingsProvider.get(settings.GROUP),
        });

        this.setState({
            isOpen: false
        });

        this.props.onClosed();
    }
}