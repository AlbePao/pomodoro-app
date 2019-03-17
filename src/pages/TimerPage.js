import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Page,
  Navbar,
  Block,
  Gauge,
  Row,
  Col,
  Button
} from 'framework7-react';
import Timer from 'tiny-timer';

class TimerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: this.props.activityDuration,
      repetitionElapsed: 0,
      inProgress: 'activity',
      isTimerStopped: false,
      buttonLabel: 'Pause',
      rangeLabel: 'to the end of activity',
      rangeValue: 1,
      rangeText: this.millisToMinutesAndSeconds(this.props.activityDuration),
    };

    this.timer = new Timer();
    this.timerStopSound = new Audio('../static/timer_stop_sound.mp3');
  }

  componentDidMount() {
    if (this.$f7.device.cordova) {
      window.plugins.insomnia.keepAwake();
    }

    this.startTimer();
  }

  componentWillUnmount() {
    if (this.$f7.device.cordova) {
      window.plugins.insomnia.allowSleepAgain();
    }

    this.timer.stop();
  }

  millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);

    return (
      seconds === 60 ? (
        (minutes < 10 ? '0' : '') + (minutes + 1) + ':00'
      ) : (
        (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
      )
    );
  }

  startTimer() {
    this.timer.start(this.state.time);

    this.timer.on('tick', ms => {
      this.setState({
        rangeValue: (ms / (this.state.time)).toFixed(2),
        rangeText: this.millisToMinutesAndSeconds(ms),
      });
    });

    this.timer.on('done', () => {
      this.toggleActivity();
    });
  }

  toggleActivity() {
    navigator.vibrate([250, 250, 250]);
    this.timerStopSound.play();

    this.setState((prevState, props) => {
      return (
        prevState.inProgress === 'activity' ? {
          time: props.pauseDuration,
          repetitionElapsed: prevState.repetitionElapsed + 1,
          inProgress: 'pause',
          rangeLabel: 'to the end of pause',
        } : {
          time: props.activityDuration,
          inProgress: 'activity',
          rangeLabel: 'to the end of activity'
        }
      );
    });

    if (this.state.repetitionElapsed === this.props.totalRepetition) {
      this.$f7.dialog.alert('Activity completed!', () => {
        this.$f7router.back();
      });

      return;
    }

    this.timer.start(this.state.time);
  }

  toggleTimer() {
    if (!this.state.isTimerStopped) {
      this.timer.pause();
    } else {
      this.timer.resume();
    }

    this.setState(prevState => ({
      isTimerStopped: !prevState.isTimerStopped,
      buttonLabel: prevState.isTimerStopped ? 'Pause' : 'Resume',
    }));
  }

  quitTimer() {
    this.$f7.dialog.confirm('Are you sure you want to quit the activity?', () => {
      this.$f7router.back();
    });
  }

  render() {
    return (
      <Page>
        <Navbar title="Pomodoro App" />

        <Block strong className="text-align-center">
          {/* TODO: change borderColor according to activity/pause state and valueTextColor */}
          <Gauge
            type="semicircle"
            size={300}
            valueFontSize={60}
            labelText={this.state.rangeLabel}
            value={this.state.rangeValue}
            valueText={this.state.rangeText}
            valueTextColor="green"
            borderColor="blue"
          />
        </Block>

        <Block>
          <Row tag="p">
            <Col tag="span">
              <Button
                large
                fill
                raised
                onClick={this.toggleTimer.bind(this)}
                text={this.state.buttonLabel}
              />
            </Col>
            <Col tag="span">
              <Button
                large
                fill
                raised
                onClick={this.quitTimer.bind(this)}
                text="Stop and quit"
              />
            </Col>
          </Row>
        </Block>
      </Page>
    );
  }
}

TimerPage.propTypes = {
  activityDuration: PropTypes.number.isRequired,
  pauseDuration: PropTypes.number.isRequired,
  totalRepetition: PropTypes.number.isRequired,
};

export default TimerPage;
