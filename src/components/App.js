import React, { Component } from 'react';
import {
  App,
  View,
  Statusbar,
} from 'framework7-react';

import cordovaApp from '../js/cordova-app';
import routes from '../js/routes';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      // Framework7 Parameters
      f7params: {
        id: 'it.albertopaolucci.pomodoro', // App bundle ID
        name: 'Pomodoro App', // App name
        theme: 'auto', // Automatic theme detection
        routes: routes,
        input: {
          scrollIntoViewOnFocus: !!this.$device.cordova,
          scrollIntoViewCentered: !!this.$device.cordova,
        },
        // Cordova Statusbar settings
        statusbar: {
          overlay: this.$device.cordova && this.$device.ios || 'auto',
          iosOverlaysWebView: true,
          androidOverlaysWebView: false,
        },
      },
    };
  }

  componentDidMount() {
    this.$f7ready((f7) => {
      // Init cordova APIs (see cordova-app.js)
      if (f7.device.cordova) {
        cordovaApp.init(f7);
      }
      // Call F7 APIs here
    });
  }

  render() {
    return (
      <App params={this.state.f7params}>
        {/* Status bar overlay for fullscreen mode*/}
        <Statusbar />

        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />
      </App>
    );
  }
}

export default Main;
