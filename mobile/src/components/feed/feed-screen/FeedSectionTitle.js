import React, { Component } from 'react'
import { View, SectionList, Image, TouchableOpacity } from 'react-native';
import { Icon, Text, ListItem, Card } from 'react-native-elements';

import styles from './styles';
import colors from '../../../ui/colors';

export default class FeedSectionTitle extends Component {
    render() {
        return (
            <View style={styles.feedSectionTitleContainer}>
                <Text h4 style={styles.feedSectionTitle}>{this.props.text}</Text>

                {this.props.onAddPress &&
                    <TouchableOpacity
                        style={styles.feedSectionTitleAddIconContainer}
                        onPress={this.props.onAddPress.bind(this)}>
                        <Icon
                            underlayColor='transparent'
                            name='plus'
                            type='font-awesome'
                            size={18}
                            iconStyle={{ color: colors.darkGrey }} />
                    </TouchableOpacity>}
            </View>
        )
    }
}
