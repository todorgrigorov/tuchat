import React, { Component } from 'react';
import { View, TextInput, Image, Text, Animated, Alert } from 'react-native';
import { Button } from "react-native-elements";

import ScreenLayout from '../../common/screen-layout/index';
import styles from './styles';
import colors from '../../../ui/colors';
import apiRoutes from '../../../config/api-routes';
import http from '../../../services/http';
import settingsProvider from '../../../services/settings-provider';
import settings from '../../../config/settings';
import timezoneProvider from '../../../services/timezone-provider';
import routeProvider from '../../../services/route-provider';
import classroom from '../../../../assets/images/classroom.png';
import tuchat from '../../../../assets/images/tuchat.png';

const config = {
    STUDENT_CODE_LENGTH: 8,
    LOGO_FADE_DURATION: 300,
    BACKGROUND_BLUR_DURATION: 250,
    CODE_VALIDATION: '^[0-9]*$'
};

export default class LoginScreen extends Component {
    state = {
        backgroundBlur: 1,
        title: 'tuchat',
        titleOpacity: new Animated.Value(1),
        info: 'Collaboration for university students',
        infoOpacity: new Animated.Value(1),
        buttonOpacity: new Animated.Value(1),
        editable: true,
        showTitle: true,
        showCodeInput: false,
        showPasswordInput: false,
        code: '',
        password: ''
    }

    render() {
        return (
            <ScreenLayout>
                <View style={styles.backgroundLayout}>
                    <Image
                        style={styles.background}
                        blurRadius={this.state.backgroundBlur}
                        source={classroom} />
                </View>

                <View style={styles.middleLayout}></View>

                <View style={styles.foregroundLayout}>
                    <Image
                        style={styles.logo}
                        source={tuchat} />

                    {this.state.showTitle &&
                        <Animated.View style={{ alignItems: 'center', opacity: this.state.titleOpacity }}>
                            <Text style={[styles.title, {}]}>{this.state.title}</Text>
                        </Animated.View>}

                    {this.state.showCodeInput &&
                        <TextInput
                            value={this.state.code}
                            onChangeText={this.onCodeChange.bind(this)}
                            style={styles.input}
                            keyboardType='numeric'
                            autoFocus={true}
                            editable={this.state.editable}
                            maxLength={config.STUDENT_CODE_LENGTH}
                            selectionColor={colors.white} />}

                    {this.state.showPasswordInput &&
                        <TextInput
                            value={this.state.password}
                            maxLength={50}
                            autoFocus={true}
                            secureTextEntry={true}
                            style={styles.input}
                            underlineColorAndroid='transparent'
                            returnKeyType='go'
                            selectionColor={colors.white}
                            editable={this.state.editable}
                            enablesReturnKeyAutomatically={true}
                            onSubmitEditing={e => this.onPasswordSubmit(e.nativeEvent.text)} />}

                    <Animated.View style={{ alignItems: 'center', opacity: this.state.infoOpacity }}>
                        <Text style={[styles.info, {}]}>{this.state.info}</Text>
                    </Animated.View>

                    <Animated.View style={[styles.bottomButton, { alignItems: 'center', opacity: this.state.buttonOpacity }]}>
                        <Button
                            onPress={this.onSignInPress.bind(this)}
                            containerViewStyle={{ width: '100%' }}
                            buttonStyle={{ backgroundColor: colors.white }}
                            color={colors.black}
                            title='sign in' />
                    </Animated.View>
                </View>
            </ScreenLayout>
        );
    }

    async onCodeChange(code) {
        this.setState({
            code
        });

        if (code && code.length === config.STUDENT_CODE_LENGTH) {
            if (this.isCodeValid(code)) {
                this.setState({
                    editable: false
                });

                this.showPasswordInput();
            } else {
                Alert.alert('The sign-in code must only contain digits.');
            }
        }
    }

    isCodeValid(code) {
        return new RegExp(config.CODE_VALIDATION).test(code);
    }

    showPasswordInput() {
        this.setState({
            info: 'Enter your password',
            showCodeInput: false,
            showPasswordInput: true,
            editable: true
        });
    }

    async onPasswordSubmit(password) {
        if (password) {
            this.setState({
                editable: false
            });

            const result = await http.request(
                `${apiRoutes.AUTH}`,
                'POST', {
                    code: this.state.code,
                    password
                });

            if (result.isOkay && result.data) {
                settingsProvider.set(settings.AUTH_TOKEN, result.data.token);
                Alert.alert(await settingsProvider.get(settings.AUTH_TOKEN))
                await this.login(result.data);
            } else if (result.isNotValid) {
                Alert.alert('You have entered wrong sign-in credentials.');

                this.setState({
                    editable: true
                });
            }
        }
    }

    async login(user) {
        const { navigate } = this.props.navigation;

        const result = await http.request(`${apiRoutes.STUDENTS}/${user.studentId}`);

        settingsProvider.set(settings.ID, user.id);
        settingsProvider.set(settings.STUDENT_ID, user.studentId);
        settingsProvider.set(settings.CODE, user.code);
        settingsProvider.set(settings.FIRST_NAME, result.data.firstName);
        settingsProvider.set(settings.LAST_NAME, result.data.lastName);
        settingsProvider.set(settings.FACULTY_ID, result.data.facultyId);
        settingsProvider.set(settings.SPECIALTY_ID, result.data.specialtyId);
        settingsProvider.set(settings.GROUP, result.data.group);
        settingsProvider.set(settings.PHOTO_ID, user.photoId);

        await timezoneProvider.setUserTimezone();

        navigate(await routeProvider.getRoot());
    }

    onSignInPress() {
        Animated.timing(
            this.state.buttonOpacity, {
                toValue: 0
            }).start(() => {
                this.blurBackground();
                this.eraseTitle(() => {
                    this.setState({
                        info: 'Enter your faculty code',
                        showCodeInput: true
                    });

                    Animated.timing(
                        this.state.infoOpacity, {
                            toValue: 1,
                        }
                    ).start();
                });
            });
    }

    blurBackground() {
        // using animations does not work
        setTimeout(() => {
            this.setState({
                backgroundBlur: this.state.backgroundBlur + 1
            })

            setTimeout(() => {
                this.setState({
                    backgroundBlur: this.state.backgroundBlur + 1
                })

                setTimeout(() => {
                    this.setState({
                        backgroundBlur: this.state.backgroundBlur + 1
                    })

                    setTimeout(() => {
                        this.setState({
                            backgroundBlur: this.state.backgroundBlur + 1
                        })

                        setTimeout(() => {
                            this.setState({
                                backgroundBlur: this.state.backgroundBlur + 1
                            })

                            setTimeout(() => {
                                this.setState({
                                    backgroundBlur: this.state.backgroundBlur + 1
                                })

                                setTimeout(() => {
                                    this.setState({
                                        backgroundBlur: this.state.backgroundBlur + 1
                                    })
                                }, config.BACKGROUND_BLUR_DURATION);
                            }, config.BACKGROUND_BLUR_DURATION);
                        }, config.BACKGROUND_BLUR_DURATION);
                    }, config.BACKGROUND_BLUR_DURATION);
                }, config.BACKGROUND_BLUR_DURATION);
            }, config.BACKGROUND_BLUR_DURATION);
        }, config.BACKGROUND_BLUR_DURATION);
    }

    eraseTitle(callback) {
        Animated.timing(
            this.state.infoOpacity, {
                toValue: 0,
            }
        ).start(() => {
            this.setState({
                title: 'tucha',
            });

            setTimeout(() => {
                this.setState({
                    title: 'tuch'
                });

                setTimeout(() => {
                    this.setState({
                        title: 'tuc'
                    });

                    setTimeout(() => {
                        this.setState({
                            title: 'tu'
                        });

                        setTimeout(() => {
                            this.setState({
                                title: 't'
                            });

                            setTimeout(() => {
                                this.setState({
                                    title: ''
                                });

                                callback();
                            }, config.LOGO_FADE_DURATION);
                        }, config.LOGO_FADE_DURATION);
                    }, config.LOGO_FADE_DURATION);
                }, config.LOGO_FADE_DURATION);
            }, config.LOGO_FADE_DURATION);
        });
    }
}