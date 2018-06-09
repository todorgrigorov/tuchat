import React, { Component } from 'react'
import { TouchableOpacity, SectionList, Image, StatusBarIOS } from 'react-native';
import { Icon, Text, ListItem, Card } from 'react-native-elements';

import styles from './styles';
import FeedSectionItemIcon from './FeedSectionItemIcon';
import settingsProvider from '../../../services/settings-provider';
import settings from '../../../config/settings';
import colors from '../../../ui/colors';

const config = {
};

export default class FeedSectionItem extends Component {
    state = {
    }

    render() {
        return (
            <ListItem
                onPress={() => this.props.onPress({
                    id: this.props.id,
                    title: this.props.title,
                    subtitle: this.props.subtitle
                })}
                component={TouchableOpacity}
                hideChevron={true}
                leftIcon={<FeedSectionItemIcon photoId={this.props.photoId} />}
                containerStyle={{ borderBottomWidth: 0 }}
                title={this.props.title}
                subtitle={this.props.subtitle}
                subtitleNumberOfLines={3}
                rightTitle={this.props.detail}
                titleStyle={styles.feedItemTitle}
                subtitleStyle={styles.feedItemSubtitle}
                rightTitleStyle={styles.feedItemDetail} />
        )
    }
}
