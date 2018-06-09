import React from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

import routeProvider from './services/route-provider';
import timezoneProvider from './services/timezone-provider';
import settingsProvider from './services/settings-provider';
import ScreenLayout from './components/common/screen-layout';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialRoute: null,
      initialRouteParams: null
    };
  }

  async componentWillMount() {
    this.setState({
      initialRoute: await routeProvider.getRoot()
    });

    // await settingsProvider.flush();
    await timezoneProvider.setUserTimezone();
  }

  render() {
    if (this.state.initialRoute) {
      const AppNavigator = routeProvider.getAppNavigator(this.state.initialRoute, this.state.initialRouteParams);
      return <AppNavigator />;
    } else {
      return (
        <ScreenLayout style={{ justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </ScreenLayout>
      );
    }
  }
}