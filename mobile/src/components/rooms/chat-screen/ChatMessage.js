import React, { Component } from 'react'
import { View, Linking, Alert } from 'react-native';
import { Avatar, ListItem, Text } from 'react-native-elements';
import ParsedText from 'react-native-parsed-text';

import styles from './styles';
import ChatMessageImage from './ChatMessageImage';
import UserIcon from '../../common/user-icon';
import messageType from './message-type';

export default class ChatMessage extends Component {
    render() {
        return (
            <View>
                {this.props.showDaySection &&
                    <View style={styles.daySectionContainer}>
                        <View style={styles.daySectionBorder} />
                        <Text style={styles.daySectionTitle}>{this.props.day}</Text>
                    </View>}

                <View style={[styles.messageContainer, {
                    marginTop: this.props.isConsecutive ? 2 : 5,
                    marginBottom: this.props.isLast ? 10 : 0,
                    opacity: this.props.isSynced ? 1 : .5
                }]}>
                    <View style={styles.messageAvatarContainer}>
                        {!this.props.isConsecutive &&
                            <UserIcon size={38} photoId={this.props.senderPhotoId} />}
                    </View>

                    <View style={styles.messageContentContainer}>
                        {!this.props.isConsecutive &&
                            <View style={styles.messageTitleContainer}>
                                <Text style={styles.messageTitle}>{this.props.sender}</Text>
                                <Text style={styles.messageSubtitle}>{this.props.time}</Text>
                            </View>}

                        {this.props.type === messageType.text &&
                            <ParsedText
                                style={styles.messageContent}
                                parse={[{
                                    type: 'url',
                                    style: styles.messageUrlContent,
                                    onPress: this.onUrlPress.bind(this)
                                }]}>
                                {this.props.content}
                            </ParsedText>}

                        {(this.props.type === messageType.portraitImage || this.props.type === messageType.landscapeImage) &&
                            <ChatMessageImage
                                isPortrait={this.props.type === messageType.portraitImage}
                                uri={this.props.content} />}
                    </View>

                </View>
            </View>
        )
    }

    onUrlPress(url) {
        if (Linking.canOpenURL(url)) {
            Linking.openURL(url);
        } else {
            Alert.alert('Could not open this link.');
        }
    }
}
