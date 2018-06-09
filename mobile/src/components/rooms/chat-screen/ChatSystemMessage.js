import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';

import styles from './styles';
import { Day } from 'react-native-gifted-chat';
import UserIcon from '../../common/user-icon';
import colors from '../../../ui/colors';

export default class ChatSystemMessage extends Component {
    render() {
        if (this.props.isIntro) {
            return (
                <View style={styles.introMessageContainer}>
                    <Icon
                        containerStyle={styles.introMessageIcon}
                        size={70}
                        color={colors.black}
                        type='font-awesome'
                        name='flag-o' />

                    <Text style={styles.introMessageContent}>{this.props.text}</Text>
                </View>
            )
        } else {
            return (
                <View style={[styles.introMessageContainer, {
                    marginBottom: this.props.isLast ? 10 : 15,
                }]}>
                    <Text style={styles.systemMessageContent}>{this.props.text}</Text>
                </View>
            )
        }
    }
}