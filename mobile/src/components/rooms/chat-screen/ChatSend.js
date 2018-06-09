import React, { Component } from 'react'
import { Icon } from 'react-native-elements';
import { Send } from 'react-native-gifted-chat';

import styles from './styles';
import colors from '../../../ui/colors';

export default class ChatSend extends Component {
    render() {
        return (
            <Send {...this.props}>
                <Icon
                    underlayColor='transparent'
                    name='send'
                    type='font-awesome'
                    size={20}
                    containerStyle={styles.messageComposeSendContainer}
                    iconStyle={{ color: colors.accent }} />
            </Send>
        )
    }
}
