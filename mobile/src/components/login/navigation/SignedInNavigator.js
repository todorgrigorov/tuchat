import { StackNavigator } from 'react-navigation';

import FeedScreen from "../../feed/feed-screen/index";
import SettingsScreen from "../../profile/settings-screen/index";
import ChatScreen from '../../rooms/chat-screen';
import CameraScreen from '../../rooms/camera-screen';

export default StackNavigator({
    Feed: {
        screen: FeedScreen
    },
    Camera: {
        screen: CameraScreen
    },
    Chat: {
        screen: ChatScreen
    },
    Settings: {
        screen: SettingsScreen
    }
}, {
        headerMode: 'none'
    });