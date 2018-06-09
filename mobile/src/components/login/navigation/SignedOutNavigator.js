import { StackNavigator, TabNavigator } from 'react-navigation';
import LoginScreen from '../../login/login-screen/index';

export default StackNavigator({
    Login: {
        screen: LoginScreen,
    },
}, {
        mode: 'modal',
        headerMode: 'none'
    });