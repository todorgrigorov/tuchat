import React from 'react';
import { Image, View } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { Icon, Text, Tile } from 'react-native-elements';

import colors from '../../../ui/colors';
import styles from './styles';
import apiRoutes from '../../../config/api-routes';

const UserIcon = props => {
    if (props.photoId) {
        return (
            <FadeIn
                renderPlaceholderContent={
                    <Icon
                        size={props.size}
                        containerStyle={{
                            height: props.size,
                            width: props.size,
                            borderRadius: props.size / 2,
                        }}
                        color={colors.grey}
                        type='font-awesome'
                        name='user-circle' />
                }>

                <Image
                    style={{
                        height: props.size,
                        width: props.size,
                        borderRadius: props.size / 2
                    }}
                    source={{ uri: `${apiRoutes.ADDRESS}${apiRoutes.ATTACHMENTS}/${props.photoId}` }} />

            </FadeIn>
        );
    } else {
        return (
            <Icon
                size={props.size}
                containerStyle={{
                    height: props.size,
                    width: props.size,
                    borderRadius: props.size / 2,
                }}
                color={colors.grey}
                type='font-awesome'
                name='user-circle' />
        )
    }
}

export default UserIcon;
