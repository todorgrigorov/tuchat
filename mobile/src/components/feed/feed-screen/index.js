import React, { Component } from 'react';
import { TouchableOpacity, Keyboard, Text } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import parallel from 'async-await-parallel';

import styles from './styles';
import FeedHeader from './FeedHeader';
import FeedHeaderBackground from './FeedHeaderBackground';
import FeedRoomsSection from './FeedRoomsSection';
import FeedPeopleSection from './FeedPeopleSection';
import ScreenLayout from "../../common/screen-layout/index";
import ScreenHeader from "../../common/screen-header/index";
import { Header, Tile, Card, Icon } from 'react-native-elements';
import colors from '../../../ui/colors';
import http from '../../../services/http';
import apiRoutes from '../../../config/api-routes';
import settingsProvider from '../../../services/settings-provider';
import settings from '../../../config/settings';
import AddRoomModal from '../add-room-modal';

const config = {
    HEADER_HEIGHT: 220,
    STICKY_HEADER_HEIGHT: 70,
    LOAD_INTERVAL: 2000
};

export default class FeedScreen extends Component {
    state = {
        roomsLoading: true,
        peopleLoading: true,
        rooms: [],
        people: [],
        showAddRoomModal: false
    }

    async componentWillMount() {
        await this.loadData();

        this.loadInterval = setInterval(async () => await this.loadData(), config.LOAD_INTERVAL);
    }

    componentWillUnmount() {
        if (this.loadInterval) {
            clearInterval(this.loadInterval);
        }
    }

    render() {
        return (
            <ScreenLayout>
                <ParallaxScrollView
                    outputScaleValue={10}
                    contentContainerStyle={{ alignItems: 'center' }}
                    renderBackground={this.renderBackground}
                    renderForeground={this.renderForeground}
                    renderStickyHeader={this.renderStickyHeader.bind(this)}
                    renderFixedHeader={this.renderFixedHeader.bind(this)}
                    stickyHeaderHeight={config.STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={config.HEADER_HEIGHT}
                    contentBackgroundColor={colors.lightGrey}
                    onChangeHeaderVisibility={this.onChangeHeaderVisibility.bind(this)}>

                    <FeedRoomsSection
                        loading={this.state.roomsLoading}
                        rooms={this.state.rooms}
                        onAddRoomPress={this.onAddRoomPress.bind(this)}
                        onRoomPress={this.onRoomPress.bind(this)} />
                    <FeedPeopleSection
                        loading={this.state.peopleLoading}
                        people={this.state.people}
                        onPersonPress={this.onPersonPress.bind(this)} />

                </ParallaxScrollView>

                {this.state.showAddRoomModal &&
                    <AddRoomModal
                        rooms={this.state.rooms}
                        onClosed={this.onAddRoomModalClosed.bind(this)} />}

            </ScreenLayout>
        );
    }

    onAddRoomPress() {
        Keyboard.dismiss();

        this.setState({
            showAddRoomModal: true
        });
    }

    onAddRoomModalClosed() {
        this.setState({
            showAddRoomModal: false
        });
    }

    renderBackground() {
        return <FeedHeaderBackground />
    }

    renderForeground() {
        return <FeedHeader />
    }

    renderStickyHeader() {
        return <ScreenHeader title='tuchat' />
    }

    renderFixedHeader() {
        return (
            <TouchableOpacity
                onPress={this.onSettingsPress.bind(this)}
                style={styles.fixedHeader}>
                <Icon
                    underlayColor='transparent'
                    name='cog'
                    type='font-awesome'
                    iconStyle={{ color: colors.white }} />
            </TouchableOpacity>
        )
    }

    onSettingsPress() {
        this.props.navigation.navigate('Settings');
    }

    onChangeHeaderVisibility(visible) {
    }

    onRoomPress(room) {
        this.props.navigation.navigate('Chat', {
            roomId: room.id,
            roomName: `#${room.name}`,
            isSystem: room.isSystem
        });
    }

    onPersonPress(person) {
    }

    async loadData() {
        let rooms = [];
        let people = [];

        const id = await settingsProvider.get(settings.STUDENT_ID);
        await parallel([
            async () => {
                const result = await http.request(`${apiRoutes.FEED_ROOMS_BY_STUDENT}/${id}`);
                rooms = result.data;
            }, async () => {
                const result = await http.request(`${apiRoutes.FEED_PEOPLE_BY_STUDENT}/${id}`);
                people = result.data;
            }]);

        this.setState({
            roomsLoading: false,
            peopleLoading: false,
            rooms,
            people
        });
    }
}