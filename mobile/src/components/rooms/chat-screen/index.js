import React, { Component } from 'react';
import { View, Keyboard, Alert, ActivityIndicator } from 'react-native';
import moment from "moment";
import { GiftedChat, Send, Actions } from 'react-native-gifted-chat';
import parallel from 'async-await-parallel';
import RNFetchBlob from 'react-native-fetch-blob';

import ScreenLayout from "../../common/screen-layout/index";
import ScreenHeader from "../../common/screen-header/index";
import ChatMessage from "./ChatMessage";
import ChatActions from "./ChatActions";
import ChatSend from "./ChatSend";
import ChatSystemMessage from "./ChatSystemMessage";
import GalleryModal from "../gallery-modal";
import styles from './styles';
import colors from '../../../ui/colors';
import settingsProvider from '../../../services/settings-provider';
import settings from '../../../config/settings';
import apiRoutes from '../../../config/api-routes';
import socketEvents from '../../../config/socket-events';
import http from '../../../services/http';
import sockets from '../../../services/sockets';
import messageType from './message-type';

const config = {
};

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);

        const { params } = this.props.navigation.state;
        this.room = {
            id: params.roomId,
            name: params.roomName,
            isSystem: params.isSystem
        };

        this.addSocketEvents();
    }

    state = {
        user: {},
        messages: [],
        loading: true,
        isEmpty: false,
        showGallery: false
    }

    async componentWillMount() {
        const user = {};
        let messages = null;

        await parallel([async () => {
            user.id = await settingsProvider.get(settings.ID);
            user.photoId = await settingsProvider.get(settings.PHOTO_ID);
            user.name = `${await settingsProvider.get(settings.FIRST_NAME)} ${await settingsProvider.get(settings.LAST_NAME)}`;
        }, async () => {
            const result = await http.request(`${apiRoutes.MESSAGES_BY_ROOM}/${this.room.id}`);
            messages = this.formatMessages(result.data);
        }]);

        this.setState({
            user,
            messages,
            loading: false
        });

        sockets.instance.emit(socketEvents.join, {
            userId: user.id,
            roomId: this.room.id
        });
    }

    componentWillUnmount() {
        sockets.instance.emit(socketEvents.leave, {
            userId: this.state.user.id,
            roomId: this.room.id
        });
    }

    render() {
        return (
            <ScreenLayout style={styles.layout}>
                <ScreenHeader back title={this.room.name} />

                {this.state.loading &&
                    <ActivityIndicator
                        size='large'
                        style={styles.loading} />}

                {!this.state.loading &&
                    <GiftedChat
                        messageIdGenerator={this.messageIdGenerator.bind(this)}
                        isAnimated={false}
                        placeholder={this.getInputPlaceholer()}
                        messages={this.state.messages}
                        renderMessage={this.renderMessageItem.bind(this)}
                        renderSend={props => <ChatSend {...props} />}
                        renderActions={this.renderActions.bind(this)}
                        onSend={this.onSend.bind(this)}
                        user={this.state.user}
                        minInputToolbarHeight={48}
                        textInputProps={{ editable: !this.room.isSystem }}
                        textInputStyle={{ lineHeight: 20 }} />}

                {this.state.showGallery &&
                    <GalleryModal
                        onImageSelected={this.onGalleryImageSelected.bind(this)}
                        onClosed={this.onGalleryClosed.bind(this)} />}
            </ScreenLayout>
        );
    }

    messageIdGenerator() {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }

    renderActions() {
        if (!this.room.isSystem) {
            return <ChatActions
                onSendPhotoPress={this.onSendPhotoPress.bind(this)} />
        } else {
            return <View />
        }
    }

    onSendPhotoPress() {
        Keyboard.dismiss();

        this.setState({
            showGallery: true
        });
    }

    onGalleryClosed() {
        this.setState({
            showGallery: false
        });
    }

    async onGalleryImageSelected(image) {
        const data = await RNFetchBlob.fs.readFile(image.uri, 'base64');
        const result = await http.request(
            apiRoutes.ATTACHMENTS_UPLOAD_SINGLE,
            'POST', {
                name: image.filename,
                base64: data,
            });

        this.onSend([{
            _id: this.messageIdGenerator(),
            createdAt: new Date(),
            user: this.state.user,
            text: `${apiRoutes.ADDRESS}${apiRoutes.ATTACHMENTS}/${result.data.id}`,
            type: image.height > image.width ? messageType.portraitImage : messageType.landscapeImage,
        }]);
    }

    renderSystemMessageItem(currentMessage) {
        const { previousMessage, nextMessage } = currentMessage;
        const isLast = nextMessage && !nextMessage.user;

        return (
            <ChatSystemMessage
                text={currentMessage.text}
                isIntro={currentMessage.isIntro}
                isLast={isLast} />
        )
    }

    renderMessageItem({ currentMessage }) {
        if (currentMessage.isSystem && !currentMessage.user.id) {
            return this.renderSystemMessageItem(currentMessage);
        } else {
            return this.renderDefaultMessageItem(currentMessage);
        }
    }

    renderDefaultMessageItem(currentMessage) {
        const day = moment(currentMessage.createdAt).format('dddd, Do');
        const time = moment(currentMessage.createdAt).format('HH:mm');
        const { previousMessage, nextMessage } = currentMessage;
        const isConsecutive = previousMessage && previousMessage.user && currentMessage.user.id === previousMessage.user.id;
        const isLast = nextMessage && !nextMessage.user;
        const isSynced = currentMessage.id !== undefined;
        const showDaySection = !previousMessage.user || !moment(currentMessage.createdAt).isSame(moment(previousMessage.createdAt), 'day');

        return (
            <ChatMessage
                sender={currentMessage.user.name}
                senderPhotoId={currentMessage.user.photoId}
                showDaySection={showDaySection}
                day={day}
                time={time}
                content={currentMessage.content}
                isLast={isLast}
                isConsecutive={isConsecutive}
                isSynced={isSynced}
                type={currentMessage.type} />
        )
    }

    getInputPlaceholer() {
        if (this.room.isSystem) {
            return `${this.room.name} is restricted to university officials`;
        } else {
            return `type something to ${this.room.name}...`;
        }
    }

    onSend(messages = []) {
        for (const message of messages) {
            sockets.instance.emit(socketEvents.messageSent, {
                userId: message.user.id,
                roomId: this.room.id,
                content: message.text,
                type: message.type || messageType.text
            });
        }

        this.setMessages(false, messages);
    }

    setMessages(needsFormatting, messages = []) {
        let data = messages;
        if (needsFormatting) {
            data = this.formatMessages(messages);
        }

        this.setState(previousState => {
            return {
                messages: GiftedChat.append(previousState.messages, data),
            };
        });
    }

    setLocalMessages(message) {
        this.setState(previousState => {
            // simulate "fade" effect
            previousState.messages.splice(0, 1);
            return {
                messages: GiftedChat.append(previousState.messages, this.formatMessage(message))
            };
        });
    }

    formatMessage(message) {
        const formatted = Object.assign({}, message);

        formatted._id = message.id;
        formatted.text = message.content;
        formatted.system = message.isSystem;

        if (!message.isSystem) {
            formatted.user._id = message.user.id;
        }

        return formatted;
    }

    formatMessages(messages) {
        const result = [];
        messages.forEach(m => result.push(this.formatMessage(m)));
        return result;
    }

    addSocketEvents() {
        sockets.instance.on(socketEvents.newMessage, message => {
            if (message.user.id !== this.state.user.id) {
                this.setMessages(true, [message]);
            } else {
                this.setLocalMessages(message);
            }
        });
    }
}