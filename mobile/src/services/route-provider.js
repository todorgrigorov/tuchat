import { SwitchNavigator } from 'react-navigation';
import SignedInNavigator from '../components/login/navigation/SignedInNavigator';
import SignedOutNavigator from '../components/login/navigation/SignedOutNavigator';
import settingsProvider from "./settings-provider";
import settings from "../config/settings";

export default {
    async getRoot() {
        let route = 'SignedOut';

        const id = await settingsProvider.get(settings.ID);
        if (id) {
            route = 'SignedIn';
        }

        return route;
    },

    getAppNavigator(initialRouteName, initialRouteParams) {
        return SwitchNavigator({
            SignedIn: {
                screen: SignedInNavigator,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            SignedOut: {
                screen: SignedOutNavigator,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
        }, {
                headerMode: "none",
                mode: "modal",
                initialRouteName: initialRouteName,
                initialRouteParams: initialRouteParams
            });
    }
}