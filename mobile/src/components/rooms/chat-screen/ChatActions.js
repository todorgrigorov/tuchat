import React, { Component } from 'react'
import { View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';
import colors from '../../../ui/colors';

export default class ChatActions extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onSendPhotoPress.bind(this)}>
                <Icon
                    underlayColor='transparent'
                    name='file-photo-o'
                    type='font-awesome'
                    size={20}
                    containerStyle={styles.messageComposerAttachmentContainer}
                    iconStyle={{ color: colors.accent }} />
            </TouchableOpacity>
        )
    }
}
