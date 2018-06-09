import React, { Component } from 'react'
import { View, SectionList, Image, ActivityIndicator } from 'react-native';
import { Icon, Text, ListItem, Card } from 'react-native-elements';
import PropTypes from 'prop-types';

import styles from './styles';
import settingsProvider from '../../../services/settings-provider';
import settings from '../../../config/settings';
import colors from '../../../ui/colors';
import FeedSectionTitle from './FeedSectionTitle';
import FeedSectionItem from './FeedSectionItem';
import messageType from '../../rooms/chat-screen/message-type';

const config = {
};

export default class FeedRoomsSection extends Component {
    state = {
    }

    render() {
        return (
            <Card
                dividerStyle={styles.feedSectionDivider}
                containerStyle={styles.feedSectionContainer}
                wrapperStyle={styles.feedSectionWrapper}>

                <FeedSectionTitle text={this.getCardTitle()} onAddPress={this.props.onAddRoomPress.bind(this)} />

                {this.props.loading &&
                    <ActivityIndicator size='large' />}

                {this.props.rooms.map((room, i) =>
                    <FeedSectionItem
                        key={room.id}
                        id={room.id}
                        title={this.getRoomTitle(room)}
                        subtitle={this.getRoomSubtitle(room)}
                        detail={room.time}
                        photoId={this.getRoomPhotoId(room)}
                        onPress={this.props.onRoomPress.bind(this, room)} />)}
            </Card>
        )
    }

    getCardTitle() {
        return `Rooms (${this.props.rooms.length})`;
    }

    getRoomTitle(room) {
        return `#${room.name}`;
    }

    getRoomSubtitle(room) {
        let subtitle = null;
        if (room.lastMessage.userId) {
            if (room.lastMessage.type === messageType.text) {
                subtitle = `${room.lastMessage.userName}: ${room.lastMessage.content}`;
            } else {
                subtitle = `${room.lastMessage.userName} sent an image.`;
            }
        }
        return subtitle;
    }

    getRoomPhotoId(room) {
        return room.lastMessage.photoId ? room.lastMessage.photoId : null;
    }
}

FeedRoomsSection.propTypes = {
    loading: PropTypes.bool,
    rooms: PropTypes.array,
    onRoomPress: PropTypes.func
}