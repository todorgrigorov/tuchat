import React, { Component } from 'react'
import { View, Image, Alert } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { Icon, Text, Tile } from 'react-native-elements';

import colors from '../../../ui/colors';
import styles from './styles';

export default class ChatMessageImage extends Component {
    state = {
        height: null,
        width: null
    }

    componentWillMount() {
        if (this.props.isPortrait) {
            this.setState({
                height: 250,
                width: '55%'
            });
        } else {
            this.setState({
                height: 150,
                width: '85%'
            });
        }
    }

    render() {
        if (this.state.height && this.state.width) {
            return (
                <FadeIn
                    placeholderStyle={styles.imageMessagePlaceholderContainer}
                    renderPlaceholderContent={
                        <Icon
                            size={28}
                            color={colors.grey}
                            iconStyle={styles.imageMessagePlaceholderIcon}
                            type='font-awesome'
                            name='image' />
                    }>

                    <Image
                        style={[styles.imageMessageImage, {
                            height: this.state.height,
                            width: this.state.width,
                        }]}
                        source={{ uri: this.props.uri }} />

                </FadeIn>
            )
        } else {
            return <View />
        }
    }
}
