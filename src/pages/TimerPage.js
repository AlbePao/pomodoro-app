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
      time: this.props.workDuration,
      repetitionElapsed: 0,
      session: 'work',
      isTimerStopped: false,
      buttonLabel: 'Pause',
      rangeLabel: 'to the end of work session',
      rangeValue: 1,
      rangeText: this.millisToMinutesAndSeconds(this.props.workDuration),
      rangeColor: '#ff6347',
    };

    this.timer = new Timer();
    this.timerStopSound = new Audio('./static/timer_stop_sound.mp3');

    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.quitTimer = this.quitTimer.bind(this);
  }

  componentDidMount() {
    if (this.$f7.device.cordova) {
      window.plugins.insomnia.keepAwake();
    }

    this.startTimer();
  }

  componentWillUnmount() {
    this.timerStopSound.pause();
    this.timer.stop();

    if (this.$f7.device.cordova) {
      window.plugins.insomnia.allowSleepAgain();
    }
  }

  millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);

    return (
      seconds === 60 ? (
        ((minutes + 1) < 10 ? '0' : '') + (minutes + 1) + ':00'
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
      this.toggleSession();
    });
  }

  pauseTimer() {
    this.timer.pause();
  }

  resumeTimer() {
    this.timer.resume();
  }

  toggleSession() {
    navigator.vibrate([250, 250, 250]);
    this.timerStopSound.play();

    this.setState((prevState, props) => {
      return (
        prevState.session === 'work' ? {
          time: props.pauseDuration,
          repetitionElapsed: prevState.repetitionElapsed + 1,
          session: 'pause',
          rangeLabel: 'to the end of pause session',
          rangeColor: '#478eff',
        } : {
          time: props.workDuration,
          session: 'work',
          rangeLabel: 'to the end of work session',
          rangeColor: '#ff6347',
        }
      );
    });

    if (this.state.repetitionElapsed === this.props.totalRepetition) {
      this.setState({
        session: 'work',
        rangeLabel: 'to the end of work session',
        rangeColor: '#ff6347',
      });

      this.$f7.dialog.alert('Session completed!', () => {
        this.$f7router.back();
      });

      return;
    }

    this.timer.start(this.state.time);
  }

  toggleTimer() {
    if (!this.state.isTimerStopped) {
      this.pauseTimer();
    } else {
      this.resumeTimer();
    }

    this.setState(prevState => ({
      isTimerStopped: !prevState.isTimerStopped,
      buttonLabel: prevState.isTimerStopped ? 'Pause' : 'Resume',
    }));
  }

  quitTimer() {
    this.pauseTimer();

    this.$f7.dialog.confirm('Are you sure you want to quit the session?', () => {
      this.$f7router.back();
    }, () => {
      this.timer.resume();
    });
  }

  render() {
    return (
      <Page>
        <Navbar title="Pomodoro App" />

        <Block strong className="text-align-center">
          <Gauge
            type="circle"
            size={320}
            labelText={this.state.rangeLabel}
            labelFontSize={20}
            value={this.state.rangeValue}
            valueText={this.state.rangeText}
            valueFontSize={70}
            valueTextColor={this.state.rangeColor}
            borderWidth={10}
            borderColor={this.state.rangeColor}
          />
        </Block>

        <Block>
          <Row tag="p">
            <Col tag="span">
              <Button
                large
                fill
                raised
                onClick={this.toggleTimer}
                text={this.state.buttonLabel}
              />
            </Col>
            <Col tag="span">
              <Button
                large
                fill
                raised
                onClick={this.quitTimer}
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
  workDuration: PropTypes.number.isRequired,
  pauseDuration: PropTypes.number.isRequired,
  totalRepetition: PropTypes.number.isRequired,
};

export default TimerPage;
