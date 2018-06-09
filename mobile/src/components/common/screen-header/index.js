import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import colors from '../../../ui/colors';
import styles from './styles';

const onBackPress = navigation => {
    navigation.goBack();
}

const ScreenHeader = props => {
    return (
        <Header
            style={{ alignSelf: 'top' }}
            leftComponent={props.back &&
                <TouchableOpacity onPress={onBackPress.bind(this, props.navigation)}>
                    <Icon
                        underlayColor='transparent'
                        name='chevron-left'
                        type='font-awesome'
                        size={20}
                        iconStyle={{ color: colors.white, }} />}
                </TouchableOpacity>}
            centerComponent={
                props.title &&
                <TouchableOpacity>
                    <Text style={styles.title}>{props.title}</Text>
                </TouchableOpacity>
            }
            rightComponent={props.rightComponent}
            backgroundColor={colors.accent}
            statusBarProps={{ barStyle: 'light-content' }} />
    );
}

ScreenHeader.propTypes = {
    back: PropTypes.bool,
    title: PropTypes.string,
    rightComponent: PropTypes.object
}

export default withNavigation(ScreenHeader);
