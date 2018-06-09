import React, { Component } from 'react';
import { TouchableOpacity, Alert, Text, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

import ScreenLayout from "../../common/screen-layout/index";
import ScreenHeader from "../../common/screen-header/index";
import colors from '../../../ui/colors';
import settingsProvider from '../../../services/settings-provider';

const config = {
};

export default class SettingsScreen extends Component {
    state = {
    }

    render() {
        return (
            <ScreenLayout>
                <ScreenHeader
                    back
                    title='Settings'
                    rightComponent={
                        <TouchableOpacity onPress={this.onLogoutPress.bind(this)}>
                            <Icon
                                underlayColor='transparent'
                                name='sign-out'
                                type='font-awesome'
                                iconStyle={{ color: colors.white }} />
                        </TouchableOpacity>
                    } />
            </ScreenLayout >
        );
    }

    onLogoutPress() {
        Alert.alert(
            'Sign out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'No',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        await settingsProvider.flush();
                        this.props.navigation.navigate('SignedOut');
                    }
                },
            ], {
                cancelable: false
            }
        )
    }
}