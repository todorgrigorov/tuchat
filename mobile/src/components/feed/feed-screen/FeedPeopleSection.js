import React, { Component } from 'react'
import { View, SectionList, Image, ActivityIndicator } from 'react-native';
import { Icon, Text, ListItem, Card } from 'react-native-elements';
import PropTypes from 'prop-types';

import styles from './styles';
import FeedSectionTitle from './FeedSectionTitle';
import FeedSectionItem from './FeedSectionItem';
import settingsProvider from '../../../services/settings-provider';
import settings from '../../../config/settings';

const config = {
};

export default class FeedPeopleSection extends Component {
    state = {
    }

    render() {
        return (
            <Card
                dividerStyle={styles.feedSectionDivider}
                containerStyle={[styles.feedSectionContainer, styles.feedSectionPeopleContainer]}
                wrapperStyle={styles.feedSectionWrapper}>

                <FeedSectionTitle text={this.getCardTitle()} />

                {this.props.loading &&
                    <ActivityIndicator size='large' />}

                {this.props.people.map((person, i) =>
                    <FeedSectionItem
                        key={person.id}
                        id={person.id}
                        title={this.getPersonTitle(person)}
                        subtitle={person.status}
                        photoId={person.photoId}
                        onPress={this.props.onPersonPress} />)}
            </Card>
        )
    }

    getCardTitle() {
        return `My Group (${this.props.people.length})`;
    }

    getPersonTitle(person) {
        return `${person.firstName} ${person.lastName}`;
    }
}

FeedPeopleSection.propTypes = {
    loading: PropTypes.bool,
    people: PropTypes.array,
    onPersonPress: PropTypes.func
}
