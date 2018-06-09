import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const ScreenLayout = props => {
    return (
        <View style={[styles.layout, props.style]}>{props.children}</View>
    );
}

export default ScreenLayout;
