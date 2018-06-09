import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import { Icon, Text, Tile } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
import moment from "moment";
import { withNavigation } from 'react-navigation';

import styles from './styles';
import settingsProvider from '../../../services/settings-provider';
import settings from '../../../config/settings';
import UserIcon from '../../common/user-icon';

const config = {
};

class FeedHeader extends Component {
    state = {
        firstName: '',
        photoId: '',
    }

    async componentWillMount() {
        this.setState({
            firstName: await settingsProvider.get(settings.FIRST_NAME),
            photoId: await settingsProvider.get(settings.PHOTO_ID),
        });
    }

    render() {
        return (
            <View style={styles.feedHeaderContainer}>
                <TouchableOpacity onPress={() => this.onPhotoPress()}>
                    <UserIcon size={110} photoId={this.state.photoId} />
                </TouchableOpacity>

                <Text style={styles.feedHeaderTitle}>
                    {`Good ${this.getGreeting()}, ${this.state.firstName}`}
                </Text>

                <ActionSheet
                    ref={o => this.actionSheet = o}
                    title='Change Photo'
                    options={['Open Camera', 'Cancel']}
                    cancelButtonIndex={1}
                    destructiveButtonIndex={1}
                    onPress={index => this.onActionSheetPress(index)} />
            </View>
        )
    }

    onActionSheetPress(index) {
        if (index === 0) {
            this.props.navigation.navigate('Camera', {
                onChange: photoId => {
                    this.setState({
                        photoId
                    });
                }
            });
        }
    }

    onPhotoPress() {
        this.actionSheet.show();
    }

    getGreeting() {
        let greeting = null;

        const splitAfternoon = 12;
        const splitEvening = 17;
        const currentHour = parseFloat(moment().format("HH"));

        if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
            greeting = "afternoon";
        } else if (currentHour >= splitEvening) {
            greeting = "evening";
        } else {
            greeting = "morning";
        }

        return greeting;
    }
}

export default withNavigation(FeedHeader);